import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatCurrency, formatPercent } from '@angular/common';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { PercentCalculo } from 'src/app/shared/functions/percent-calculo';
import { DateCalculo } from 'src/app/shared/functions/date-calculo';


interface DadosChart{name: string, data: number[], percent: number[]};

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

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    var idCategoria = null;
    var idItemMov = null;
    var idConta = null;

    //debugger;
    idConta = this.formGroup.get('idConta').value;

    
    if (this.idTipoGrafico!="T"){
      idCategoria = this.formGroup.get('idCategoria').value;
      idItemMov = this.formGroup.get('idItemMovimentacao').value;
    }
    

    if ((idCategoria != null && this.idTipoGrafico=="C") || 
        (idItemMov != null && this.idTipoGrafico=="I") ||
        this.idTipoGrafico=="T"){

          if(this.idTipoGrafico=="T"){
            this.arItemMovMensalAux = this.arItemMovMensal.filter(x=> x.tipoOperacao =="MD");

          }else if(this.idTipoGrafico=="C"){
            this.arItemMovMensalAux = this.arItemMovMensal
                                          .filter(x=> x.idCategoria==idCategoria)
                                          .filter(x=>x.tipoItemMovimentacao==this.idTipo)
                                          .filter(x=> x.tipoOperacao =="MD");
          }
          else{
            this.arItemMovMensalAux = this.arItemMovMensal
                                          .filter(x=>x.idItemMovimentacao==idItemMov)
                                          .filter(x=>x.tipoItemMovimentacao==this.idTipo);
          }
          
          if(idConta != null){
            this.arItemMovMensalAux = this.arItemMovMensalAux.filter(x=> x.idConta==idConta);
          } 

          this.isRenderChart=this.arItemMovMensalAux.length >0;

          if(this.isRenderChart){
             this.montarArrayPeriodo(this.idTipoGrafico, this.dataIni, this.dataFim);
             var title = this.idTipoGrafico=="T"? "Receitas x Despesas ": this.arDadosChart[0].name;
             this.renderizarChart(this.arDadosChart, title.toString());      
          }    
    }      

  }

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      idCategoria: [null],
      idItemMovimentacao: [null],
      idConta:[null]
    });
  }

  private montarArrayPeriodo(tipoGrafico: string, dataIni: Date, dataFim: Date) {
    this.arDadosChart.length=0;
    this.arDadosChartDates.length=0;    

    for(let data = DateCalculo.lastDay(dataIni); data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)){
       this.arDadosChartDates.push(data);         
    }
    var arParam = this.parametrosGrafico(this.arItemMovMensalAux, this.idTipoGrafico);
   
    arParam.forEach(z=>{
      var name = z;
      var valorAnterior = 0;
      var arData: number[]=[];
      var arPercent: number[]=[];
      this.arDadosChartDates.forEach(dataRef=>{
        
        var valor =  tipoGrafico=="T"? this.arItemMovMensalAux.filter(x=>x.descricaoTipoItemMovimentacao == name &&
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

        var percent = PercentCalculo.calcularPercentual(valor, valorAnterior);        

        arPercent.push(percent);
        arData.push(valor);

        valorAnterior = valor;  
      })
      var dados: DadosChart={name: z, data: arData, percent: arPercent};
      this.arDadosChart.push(dados);  
    }); 
    debugger;
    this.arDadosChart.sort((a, b)=>{return a.name > b.name ? 1 :-1});
  }

  private parametrosGrafico(array:any[],tipoVisualizacao:string):string[]{
    return array.map(x=>{ return tipoVisualizacao=='T'? x.descricaoTipoItemMovimentacao :
                                 tipoVisualizacao=='C'? x.descricaoCategoria :
                                 x.descricaoItemMovimentacao;                
                      })
    .filter((value, index, array)=>{
      return array.indexOf(value) === index;
    });
  }

  private renderizarChart(arDadosChart: DadosChart[], title: string){ 
    debugger;  
    var options = this.options(arDadosChart, title);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-itemmov-mensais"), options);
    this.chart.render();
  }

  private options(arSeries: DadosChart[], title):any{
    return {
      series: arSeries,
      chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: arSeries.length > 1? ['#A52A2A', '#1C86EE'] : 
            this.idTipo=="D"? ['#A52A2A'] : ['#1C86EE'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: title,
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
          return formatCurrency(Number.parseFloat(value), "PT-BR", "R$")
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
          return formatCurrency(Number.parseFloat(value),  "PT-BR", "R$") + 
          ' (' + formatPercent(Number.parseFloat(w.globals.initialSeries[seriesIndex].percent[dataPointIndex]), "PT-BR", "2.0-2") +')'
        }
      }        
    },
    };
  } 
}
