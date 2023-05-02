import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatCurrency, formatPercent } from '@angular/common';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { PercentCalculo } from 'src/app/shared/functions/percent-calculo';
import { DateCalculo } from 'src/app/shared/functions/date-calculo';


interface DadosChart{name: string, data: number[], valor: number[]};

@Component({
  selector: 'app-item-movimentacao-mensal',
  templateUrl: './item-movimentacao-mensal.component.html',
  styleUrls: ['./item-movimentacao-mensal.component.css']
})
export class ItemMovimentacaoMensalComponent implements OnInit {

  arItemMovMensal: any[];
  arItemMovMensalAux: any[];
  arTipos:any[];
  arDadosChart:DadosChart[]=[];
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
    //debugger;       
    var idCategoria = this.formGroup.get('idCategoria').value;
    var idItemMov = this.formGroup.get('idItemMovimentacao').value;
    this.arItemMovMensalAux = this.arItemMovMensal
                                  .filter(x=>x.tipoItemMovimentcao==this.idTipo || this.idTipoGrafico=="T")
                                  .filter(x=>x.idCategoria==idCategoria || idCategoria ==null)
                                  .filter(x=>x.idItemMovimentacao==idItemMov || idItemMov ==null);
    //debugger;
    this.isRenderChart=this.arItemMovMensalAux.length >0;

    if(this.isRenderChart){
      this.montarArrayPeriodo(this.idTipoGrafico, this.dataIni, this.dataFim);
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

  private montarArrayPeriodo(tipoGrafico: string, dataIni: Date, dataFim: Date) {
    this.arDadosChart.length=0;
    this.arDadosChartDates.length=0;    

    for(let data = DateCalculo.lastDay(dataIni); data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)){
       this.arDadosChartDates.push(data);         
    }
    debugger;
    var arParam = this.parametrosGrafico(this.arItemMovMensalAux, this.idTipoGrafico);
   
    arParam.forEach(z=>{
      var name = z;
      var valorAnterior = 0;
      var arDatas: number[]=[];
      var arValues: number[]=[];
      this.arDadosChartDates.forEach(dataRef=>{
        
        var valor =  tipoGrafico=="T"? this.arItemMovMensalAux.filter(x=>x.descricaoTipoItemMovimentcao == name &&
                                                                        Date.parse(x.dataReferencia.toString()) == 
                                                                        Date.parse(dataRef.toString()))
                                                              .reduce((acum, item)=>{return acum+item.valorMensal},0):
                     tipoGrafico=="C"? this.arItemMovMensalAux.filter(x=>x.descricaoCategoria == name &&
                                                                        Date.parse(x.dataReferencia.toString()) == 
                                                                        Date.parse(dataRef.toString()))
                                                              .reduce((acum, item)=>{return acum+item.valorMensal},0):
                                       this.arItemMovMensalAux.filter(x=>x.descricaoItemMovimentacao == name &&
                                                                        Date.parse(x.dataReferencia.toString()) == 
                                                                        Date.parse(dataRef.toString()))
                                                              .reduce((acum, item)=>{return acum+item.valorMensal},0);

        var data = PercentCalculo.calcularPercentual(valor, valorAnterior);        

        arValues.push(valor);
        arDatas.push(data);

        valorAnterior = valor;  
      })
      var dados: DadosChart={name: z, data: arDatas, valor: arValues};
      this.arDadosChart.push(dados);  
    }); 
  }

  private parametrosGrafico(array:any[],tipoVisualizacao:string):string[]{
    return array.map(x=>{ return tipoVisualizacao=='T'? x.descricaoTipoItemMovimentcao :
                                 tipoVisualizacao=='C'? x.descricaoCategoria :
                                 x.descricaoItemMovimentacao;                
                      })
    .filter((value, index, array)=>{
      return array.indexOf(value) === index;
    });
  }

  private renderizarChart(arDadosChart: DadosChart[]){   
    var options = this.options(arDadosChart);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-itemmov-mensais"), options);
    this.chart.render();
  }

  private options(arSeries: DadosChart[]):any{
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
