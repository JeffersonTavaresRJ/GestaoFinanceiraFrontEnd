import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { Movimentacao } from '../../lancamentos/_models/movimentacao';
import { MovPrevistaService } from '../../lancamentos/_services/mov-prevista-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

interface DadosChartSintet{ Data?: string; Estimativa?: Number; Receita?: Number; Despesa?:Number };
interface DadosChartAnalit{ Data?: string; Tipo?: string; TipoDescricao?: string; Valor?:Number };

@Component({
  selector: 'app-receitas-despesas-anual-dashboard',
  templateUrl: './receitas-despesas-anual-dashboard.component.html',
  styleUrls: ['./receitas-despesas-anual-dashboard.component.css']
})


export class ReceitasDespesasAnualDashboardComponent implements OnInit {

  arMovPrev: MovimentacaoPrevista[]=[];
  arMovReal: MovimentacaoRealizada[]=[];
  dataIni:Date;
  dataFim:Date;
  mesAno:string;
  tipoEstimativa:string="D";
  isRenderChart: boolean;
  chart:ApexCharts;
  arDadosChart:DadosChartSintet[]=[];
  arEstimativa:Number[]=[];
  arDespesas:Number[]=[];
  arReceitas:Number[]=[];
  arMesAno:string[]=[];

  constructor(private actResourceRoute: ActivatedRoute,
              private movPrevistaService: MovPrevistaService,
              private movRealizadaService: MovRealizadaService) {

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovPrev: MovimentacaoPrevista[] }) => {
                 this.arMovPrev = sucess.resolveMovPrev;
                        
      }
    );

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
                 this.arMovReal = sucess.resolveMovReal;
                        
      }
    );   
    
   }

  ngOnInit(): void {
    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.montarArrayPeriodo(this.dataFim);
    this.renderizarChart(this.arMovPrev, this.arMovReal);
  }
 
  populate(){
    this.arMovPrev.length=0;
    this.arMovReal.length=0;    
  

    this.montarArrayPeriodo(new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()+1, 0));

    var dataIni = DateConvert.formatDateYYYYMMDD(new Date(this.dataFim.getFullYear()-1, this.dataFim.getMonth(), 1),'-');
    var dataFim = DateConvert.formatDateYYYYMMDD(new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()+1, 0), '-');

    this.movPrevistaService.getByDataVencimento(dataIni, dataFim).subscribe(
      (success:MovimentacaoPrevista[])=>{
        this.arMovPrev = success;        

        this.movRealizadaService.GetByDataMovimentacaoRealizada(dataIni, dataFim).subscribe(
          (success:MovimentacaoRealizada[])=>{
            this.arMovReal = success;
            this.renderizarChart(this.arMovPrev, this.arMovReal);
          }
        );
      }
    );  

  }

  private montarArrayPeriodo(dataFim: Date){
    var dataIni = new Date(dataFim.getFullYear()-1, dataFim.getMonth()+1, 0);
    this.arDadosChart.length=0;
    for (let data = dataIni; data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)) {
         var dados: DadosChartSintet={Data:DateConvert.formatDateMMYYYY(data,'/'), Estimativa:0, Receita:0, Despesa:0};
         this.arDadosChart.push(dados);
    }
  }  

  renderizarChart(arMovPrevista:MovimentacaoPrevista[], arMovRealizada:MovimentacaoRealizada[]){
    debugger;

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    if(arMovPrevista.length==0 || arMovRealizada.length==0 ){ 
      this.isRenderChart =false;     
      return false;
    }

    this.isRenderChart =true;
    this.arMesAno.length=0;
    this.arEstimativa.length=0;
    this.arDespesas.length=0;
    this.arReceitas.length=0;

    var arMovPrev = this.agruparPorMes(arMovPrevista);
    var arMovReal = this.agruparPorMes(arMovRealizada);

    this.arDadosChart = this.arDadosChart.map((e)=>{
       arMovPrev.forEach(p=>{
          e.Estimativa = e.Data == p.Data && p.Tipo==this.tipoEstimativa? p.Valor:e.Estimativa;                 
       })
       arMovReal.forEach(p=>{
          e.Despesa = e.Data == p.Data && p.Tipo=="D"? p.Valor:e.Despesa;
          e.Receita = e.Data == p.Data && p.Tipo=="R"? p.Valor:e.Receita;        
       })
       return e;
    });

    this.arDadosChart.forEach(d=>{
      this.arMesAno.push(d.Data);
      this.arEstimativa.push(d.Estimativa);
      this.arDespesas.push(d.Despesa);
      this.arReceitas.push(d.Receita);
    })


    var options = {
      series: [{
      name: 'Despesas',
      type: 'column',
      data: this.arDespesas
    }, {
      name: 'Receitas',
      type: 'area',
      data: this.arReceitas
    }, {
      name: 'Estimativa',
      type: 'line',
      data: this.arEstimativa
    }],
      chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: this.arMesAno,
    colors: ['#A52A2A', '#1C86EE', '#DEB887'],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'string'
    },
    yaxis: {
      title: {
        text: 'Valor',
      },
      labels: {
        formatter: (value) => { return formatCurrency(Number.parseFloat(value), "PT-BR", "R$") }
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatCurrency(Number.parseFloat(value), "PT-BR", "R$")
        }
      }      
    }
    };  

    this.visibleChartItem(true);    
    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  }

  private agruparPorMes(arr:Movimentacao[]):DadosChartAnalit[]{
    //debugger;
    var result:DadosChartAnalit[]=[];
    
    arr.reduce(function(acumulador, obj){
      //a chave do array do acumulador é a dataReferencia + tipo..
      var idx = DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')+' - '+obj.itemMovimentacao.tipo;

      if (!acumulador[idx]){          
        var row:DadosChartAnalit = {Data: DateConvert.formatDateMMYYYY(obj.dataReferencia,'/'), 
                                    Tipo: obj.itemMovimentacao.tipo, 
                                    TipoDescricao: obj.itemMovimentacao.tipoDescricao, 
                                    Valor: 0}
        acumulador[idx]=row;
        result.push(acumulador[idx]);
      }
      acumulador[idx].Valor+=obj.valor;
      
      return acumulador;
    }, []);
    return result;
  }

  private visibleChartItem(status:boolean){
    var divItem = document.querySelector('#chart');
    divItem.removeAttribute("class");
    if(!status){
      divItem.classList.add("hideChart");
    }
  }

}
