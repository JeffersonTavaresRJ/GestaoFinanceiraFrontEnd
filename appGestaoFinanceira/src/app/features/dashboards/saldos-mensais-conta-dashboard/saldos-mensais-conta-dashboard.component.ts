import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { formatCurrency, formatPercent } from '@angular/common';
import { PercentCalculo } from 'src/app/shared/functions/percent-calculo';


interface ContaMensal{name: string, valor: number[], data: number[]};

@Component({
  selector: 'app-saldos-mensais-conta-dashboard',
  templateUrl: './saldos-mensais-conta-dashboard.component.html',
  styleUrls: ['./saldos-mensais-conta-dashboard.component.css']
})
export class SaldosMensaisPorContaDashboardComponent implements OnInit {
  arSaldos: any[];
  arSaldosAux: any[];
  arContas: Conta[]; 
  arSelectedContas:any[]=[]; 
  arSeries: ContaMensal[]=[];
  ano: string;
  chbxAgrupar: boolean=true;
  chart: ApexCharts;
  limiteContas: number;

  constructor(private actResourceRoute: ActivatedRoute) {     
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta; 
                 this.arContas.sort((a,b)=>{
                  return a.descricao < b.descricao? -1 : 1
                 }); 
      }
    );

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveSaldoMensalConta: any[] }) => {
                 this.arSaldos = sucess.resolveSaldoMensalConta;
                 this.arSaldos.forEach(x=>{
                      this.arSelectedContas.push(x.idConta);
                 });               
      }
    );

  }

  ngOnInit(): void {
    this.filtrarDados();
  }
 
  filtrarDados(){
    this.arSaldosAux = this.arSaldos; 

    if(this.chbxAgrupar){
      this.limiteContas= this.arContas.length;

      /*tratamento para que o componente p-multiselect entenda que ocorreu edição 
         e habilite as demais opções*/ 
      this.arSelectedContas = this.arSelectedContas;

      this.arSaldosAux = this.arSaldosAux.filter(x=>this.arSelectedContas.map((e)=>{return e}).includes(x.idConta));
      this.populateAgrupado(this.arSaldosAux);       

    }else{
      this.limiteContas=2;
      //ao desmarcar checkbox de agrupamento, manter somente 1 conta na geração do gráfico..      
      if(this.arSelectedContas.length == this.arContas.length){
        this.arSelectedContas.length=0;
        this.arSelectedContas=[this.arContas[0].id];        
      }

      this.arSaldosAux = this.arSaldosAux.filter(x=>this.arSelectedContas.map((e)=>{return e}).includes(x.idConta));
      this.populateDetalhado(this.arSaldosAux); 
     
    }
    this.renderizarChart();
  }

  private renderizarChart(){
    var ano = this.actResourceRoute.snapshot.params.ano;
    var options = this.options(this.arSeries, ano);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-saldos-mensais-conta"), options);
    this.chart.render();
  }

  private populateDetalhado(arSaldos:any[]){
    this.arSeries.length=0;
    arSaldos.forEach(e=>{
      var dados: ContaMensal={name:e.descricaoConta,
                             valor: new Array(e.janeiro, 
                              e.fevereiro, 
                              e.marco,
                              e.abril,
                              e.maio,
                              e.junho,
                              e.julho,
                              e.agosto,
                              e.setembro,
                              e.outubro,
                              e.novembro,
                              e.dezembro),
                             data: new Array(e.percJaneiro==-1 ? 0 : e.percJaneiro, 
                                             e.percFevereiro==-1 ? 0 :e.percFevereiro, 
                                             e.percMarco==-1 ? 0 :e.percMarco,
                                             e.percAbril==-1 ? 0 :e.percAbril,
                                             e.percMaio==-1 ? 0 :e.percMaio,
                                             e.percJunho==-1 ? 0 :e.percJunho,
                                             e.percJulho==-1 ? 0 :e.percJulho,
                                             e.percAgosto==-1 ? 0 :e.percAgosto,
                                             e.percSetembro==-1 ? 0 :e.percSetembro,
                                             e.percOutubro==-1 ? 0 :e.percOutubro,
                                             e.percNovembro==-1 ? 0 :e.percNovembro,
                                             e.percDezembro==-1 ? 0 :e.percDezembro)};                  
      this.arSeries.push(dados);
     });
  }

  private populateAgrupado(arSaldos:any[]){
    this.arSeries.length=0;
    var totDea=0;
    var totJan=0;
    var totFev=0;
    var totMar=0;
    var totAbr=0;
    var totMai=0;
    var totJun=0;
    var totJul=0;
    var totAgo=0;
    var totSet=0;
    var totOut=0;
    var totNov=0;
    var totDez=0;
    arSaldos.forEach(e=>{
      totDea+=e.dezembroAnterior;
      totJan+=e.janeiro;
      totFev+=e.fevereiro;
      totMar+=e.marco;
      totAbr+=e.abril;
      totMai+=e.maio;
      totJun+=e.junho;
      totJul+=e.julho;
      totAgo+=e.agosto;
      totSet+=e.setembro;
      totOut+=e.outubro;
      totNov+=e.novembro;
      totDez+=e.dezembro;      
     });
    var dados: ContaMensal={ name: arSaldos.length + " Conta(s) selecionada(s)",
                            valor: new Array(totJan, 
                                             totFev, 
                                             totMar,
                                             totAbr,
                                             totMai,
                                             totJun,
                                             totJul,
                                             totAgo,
                                             totSet,
                                             totOut,
                                             totNov,
                                             totDez),
                             data: new Array(
                             PercentCalculo.calcularPercentual(totJan,totDea), 
                             PercentCalculo.calcularPercentual(totFev,totJan), 
                             PercentCalculo.calcularPercentual(totMar,totFev),
                             PercentCalculo.calcularPercentual(totAbr,totMar),
                             PercentCalculo.calcularPercentual(totMai,totAbr),
                             PercentCalculo.calcularPercentual(totJun,totMai),
                             PercentCalculo.calcularPercentual(totJul,totJun),
                             PercentCalculo.calcularPercentual(totAgo,totJul),
                             PercentCalculo.calcularPercentual(totSet,totAgo),
                             PercentCalculo.calcularPercentual(totOut,totSet),
                             PercentCalculo.calcularPercentual(totNov,totOut),
                             PercentCalculo.calcularPercentual(totDez,totNov))};                  
      this.arSeries.push(dados);
  }

  private options(arSeries: ContaMensal[], ano: string):any{
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
      text: 'Saldos Mensais por Conta: Ano '+ano,
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
          return formatPercent(Number.parseFloat(value), "PT-BR", "0.0-2") 
        }
      },
      min: -1
    },
    xaxis: {
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
    tooltip: {
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatPercent(Number.parseFloat(value), "PT-BR", "0.0-2") + 
          ' (' + formatCurrency(Number.parseFloat(w.globals.initialSeries[seriesIndex].valor[dataPointIndex]), "PT-BR", "R$") +')'
        }
      }        
    },
    };
  }  
}
