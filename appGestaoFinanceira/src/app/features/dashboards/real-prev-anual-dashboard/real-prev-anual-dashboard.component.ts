import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { MovPrevistaService } from '../../lancamentos/_services/mov-prevista-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';
import { Movimentacao } from '../../lancamentos/_models/movimentacao';
import { DadosChartAnalitico } from '../_models/DadosChartAnalitico';
import { formatCurrency } from '@angular/common';
import { Categoria } from '../../cadastros-basicos/_models/categoria-model';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';

interface DadosChart{data:string; valor?:Number};

@Component({
  selector: 'app-real-prev-anual-dashboard',
  templateUrl: './real-prev-anual-dashboard.component.html',
  styleUrls: ['./real-prev-anual-dashboard.component.css']
})
export class RealPrevAnualDashboardComponent implements OnInit {
  arMovPrev: MovimentacaoPrevista[];
  arMovReal: MovimentacaoRealizada[];
  arMovPrevAux: MovimentacaoPrevista[];
  arMovRealAux: MovimentacaoRealizada[];
  arDadosChart:DadosChart[]=[];
  arDadosChartReal:DadosChart[]=[];
  arDadosChartPrev:DadosChart[]=[];
  arDadosChartValues: Number[]=[];
  arDadosChartDates: string[]=[];
  arContas: Conta[]=[];
  arCategorias: Categoria[]=[];
  arItensMovimentacao: ItemMovimentacao[]=[];
  idConta:Number;
  idCategoria:Number;
  idItemMovimentacao:Number;
  dataIni: Date;
  dataFim: Date;
  rdbTipo: string="D";
  isRenderChart:boolean;
  chart:ApexCharts;

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
                   
                   this.arMovReal.map((e)=>{
                    this.arItensMovimentacao.push(e.itemMovimentacao);
                    this.arCategorias.push(e.itemMovimentacao.categoria);
                    this.arContas.push(e.conta);                    
                   });

                   let uniqueItemMovimentacao = [
                    ...new Map(this.arItensMovimentacao.map((item) => [item["id"], item])).values(),
                  ];

                  let uniqueCategoria = [
                    ...new Map(this.arCategorias.map((item) => [item["id"], item])).values(),
                  ];

                  let uniqueConta = [
                    ...new Map(this.arContas.map((item) => [item["id"], item])).values(),
                  ];
                  this.arItensMovimentacao = uniqueItemMovimentacao;
                  this.arCategorias = uniqueCategoria;
                  this.arContas = uniqueConta;
                          
        }
      );
     }

  ngOnInit(): void {
    this.dataIni = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataIni, '-');
    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.renderizarChart(this.arMovPrev, this.arMovReal);
  }


  renderizarChart(arpMovPrev: MovimentacaoPrevista[], arpMovReal: MovimentacaoRealizada[]) {

    this.arMovPrevAux = arpMovPrev.filter(x=>x.itemMovimentacao.tipo== this.rdbTipo);
    this.arMovRealAux = arpMovReal.filter(x=>x.itemMovimentacao.tipo== this.rdbTipo);

    this.isRenderChart = this.arMovPrevAux.length > 0 || this.arMovRealAux.length > 0;

    if (this.isRenderChart){
        if(this.chart!=null){      
           this.chart.destroy();   
         }
          var dataIniPrev = arpMovReal.sort(function(a,b)
                                            {return(((Date.parse(b.dataMovimentacaoRealizada.toString()) - 
                                                      Date.parse(a.dataMovimentacaoRealizada.toString()))));
                                            })[0].dataReferencia;


          var dataFimReal = new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()-5, 0);
    
          //filtra os ÚLTIMOS meses da movimentação prevista APÓS a última MOVIMENTAÇÃO REALIZADA..
          this.arMovPrevAux = this.arMovPrevAux.filter((x:MovimentacaoPrevista)=>
                                                     {return Date.parse(x.dataVencimento.toString()) 
                                                           > Date.parse(dataIniPrev.toString()) &&
                                                             Date.parse(x.dataVencimento.toString()) 
                                                           <= Date.parse(this.dataFim.toString())});

          //filtra os PRIMEIROS 6 meses da movimentação realizada..
          this.arMovRealAux = this.arMovRealAux.filter((x:MovimentacaoRealizada)=>
                                                    {return Date.parse(x.dataMovimentacaoRealizada.toString())  
                                                         >= Date.parse(this.dataIni.toString()) &&
                                                            Date.parse(x.dataMovimentacaoRealizada.toString())  
                                                          <= Date.parse(dataFimReal.toString())});

          this.montarArrayPeriodo(this.dataFim);

          this.arDadosChartPrev = this.agruparPorMes(this.arMovPrevAux);
          this.arDadosChartReal = this.agruparPorMes(this.arMovRealAux);

          this.arDadosChart = this.arDadosChart.map((e)=>{
          this.arDadosChartReal.forEach(z=>{
              e.valor=e.data==z.data? z.valor: e.valor;
            })
            this.arDadosChartPrev.forEach(z=>{
              e.valor=e.data==z.data? z.valor: e.valor;
            })
            return e;
          });
          
          this.arDadosChartDates.length=0;
          this.arDadosChartValues.length=0;
          this.arDadosChart.forEach(x=>{
            this.arDadosChartDates.push(x.data);
            this.arDadosChartValues.push(x.valor);
          });
                                   

          var options = this.options();      
          this.chart = new ApexCharts(document.querySelector("#chart-real-prev"), options);
          this.chart.render();
    }    
  }

  private montarArrayPeriodo(dataFim: any) {
    var dataIni = new Date(dataFim.getFullYear()-1, dataFim.getMonth()+2, 0);
    this.arDadosChart.length=0;
    for (let data = dataIni; data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)) {
         var dados: DadosChart={data:DateConvert.formatDateMMYYYY(data,'/'), valor:0};
         this.arDadosChart.push(dados);
    }   
  }

  private agruparPorMes(arr:Movimentacao[]):DadosChart[]{
    var result:DadosChart[]=[];
    
    arr.reduce(function(acumulador, obj){
      //a chave do array do acumulador é a dataReferencia + tipo..
      var idx = DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')+' - '+obj.itemMovimentacao.tipo;

      if (!acumulador[idx]){          
        var row:DadosChartAnalitico = new DadosChartAnalitico(
                                    DateConvert.formatDateMMYYYY(obj.dataReferencia,'/'), 
                                    obj.itemMovimentacao.tipo, 
                                    obj.itemMovimentacao.tipoDescricao, 
                                    0);
        acumulador[idx]=row;
        result.push(acumulador[idx]);
      }
      acumulador[idx].valor+=obj.valor;
      
      return acumulador;
    }, []);
    return result;
  }  

  private options():any{
    return {
      series: [{
      name: 'Valor',
      data: this.arDadosChartValues
    }],
      chart: {
      height: 350,
      type: 'line',
    },
    forecastDataPoints: {
      count: 12 - this.arDadosChartReal.length /*qts serão pontilhados*/
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      type: 'string',
      categories: this.arDadosChartDates,
      tickAmount: 10
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
    title: {
      text: 'Movimentação Anual: Realizada e Prevista',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
    }
  }

}