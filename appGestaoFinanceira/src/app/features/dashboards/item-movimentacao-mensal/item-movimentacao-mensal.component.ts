import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatCurrency, formatPercent } from '@angular/common';
import { DateConvert } from 'src/app/shared/functions/date-convert';


interface ItemMovimentacaoMensal{name: string, data: number[], valor: number[]};

@Component({
  selector: 'app-item-movimentacao-mensal',
  templateUrl: './item-movimentacao-mensal.component.html',
  styleUrls: ['./item-movimentacao-mensal.component.css']
})
export class ItemMovimentacaoMensalComponent implements OnInit {

  arItemMovMensal: any[];
  arItemMovMensalAux: any[];
  arTipos:any[];
  arDadosChart:ItemMovimentacaoMensal[]=[];
  arDadosChartDates:Date[]=[];
  arTiposGrafico =[{Key:"T", Value: "Por Tipo"}, 
                   {Key:"C", Value: "Por Categoria"}, 
                   {Key:"I", Value: "Por Item Movimentação"}];
  isRenderChart:boolean;
  idTipoGrafico: string="T";
  idTipo:string="D";
  dataIni: Date;
  dataFim: Date;
  formGroup: FormGroup;
  chart: ApexCharts;


  constructor(private actResourceRoute: ActivatedRoute,
              private itemMovimentacaoService: ItemMovimentacaoService,
              protected formBuilder :FormBuilder) { 
    
                this.actResourceRoute.data.subscribe(
                    (sucess: { resolveItemMovMensal: any[] }) => {
                               this.arItemMovMensal = sucess.resolveItemMovMensal;
                               this.arItemMovMensalAux = this.arItemMovMensal;

                               this.itemMovimentacaoService.getAllTipo().subscribe(      
                                (tipos)=> this.arTipos=tipos); 
                 }
    );
  }

  ngOnInit(): void {
    this.builderForm();
    this.dataIni = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataIni, '-');
    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.consultarDados();
  }


  consultarDados():void{
    var idCategoria = this.formGroup.get('idCategoria').value;
    var idItemMov = this.formGroup.get('idItemMovimentacao').value;
    this.arItemMovMensalAux = this.arItemMovMensal
                                  .filter(x=>x.tipoItemMovimentcao==this.idTipo || this.idTipo ==null)
                                  .filter(x=>x.idCategoria==idCategoria || idCategoria ==null)
                                  .filter(x=>x.idItemMovimentacao==idItemMov || idItemMov ==null);

    this.isRenderChart=this.arItemMovMensalAux.length >0;

    if(this.isRenderChart){
      this.montarArrayPeriodo(this.dataIni, this.dataFim);
      this.renderizarChart(this.arDadosChart);
    }else{
      if(this.chart!=null){      
        this.chart.destroy();   
      }
    }
  }

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      idCategoria: [null],
      idItemMovimentacao: [null]
    });
  }

  private montarArrayPeriodo(dataIni: Date, dataFim: Date) {
    this.arDadosChart.length=0;
    var dat: number[]=[];
    var val: number[]=[];

    for(let data = dataIni; data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)){
      dat.push(0);
      val.push(0);
      this.arDadosChartDates.push(data);         
    }
    var array = this.arItemMovMensalAux
        .map(x=>{return x.descricaoItemMovimentacao})
        .filter((value, index, array)=>{
          return array.indexOf(value) === index;
        });

    array.forEach(z=>{
      var dados: ItemMovimentacaoMensal={name: z, data: dat, valor: val};
      this.arDadosChart.push(dados);  
    });    
  }

  private renderizarChart(arDadosChart: ItemMovimentacaoMensal[]){   
    var options = this.options(arDadosChart);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-itemmov-mensais"), options);
    this.chart.render();
  }

  private options(arSeries: ItemMovimentacaoMensal[]):any{
    return {
      series: arSeries,
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Itens de Movimentação Mensal',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    yaxis: {
      title: {
        text: '%',
      },
      labels: {
        formatter: (value) => { 
          return formatPercent(Number.parseFloat(value), "PT-BR", "2.0-2") 
        }
      },
      min: 0
    },
    xaxis: {
      labels: {
        formatter: (value) => { 
          return DateConvert.formatDateMMYYYY(value, '/');
        }
      },
      categories: this.arDadosChartDates,
    },
    tooltip: {
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatPercent(Number.parseFloat(value), "PT-BR", "2.0-2") + 
          ' (' + formatCurrency(Number.parseFloat(w.globals.initialSeries[seriesIndex].valor[dataPointIndex]), "PT-BR", "R$") +')'
        }
      }        
    },
    };
  } 
}
