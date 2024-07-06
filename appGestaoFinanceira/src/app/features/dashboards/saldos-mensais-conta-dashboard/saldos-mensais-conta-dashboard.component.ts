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
  chbxPercent: boolean=true;
  chart: ApexCharts;
  limiteContas: number;

  constructor(private actResourceRoute: ActivatedRoute) {     
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta.filter(c=>c.tipo!="MO"); 
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

  tratarSelecao(){
    this.limiteContas = !this.chbxAgrupar ? 2:null;
    this.arSelectedContas=[];
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
    var options = this.options(this.arSeries, ano, this.chbxPercent);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-saldos-mensais-conta"), options);
    this.chart.render();
  }

  private populateDetalhado(arSaldos:any[]){
    this.arSeries.length=0;
    arSaldos.forEach(e=>{
      var arJan= new Array(e.janeiro,   (e.percJaneiro== -1 ? 0 : e.percJaneiro));
      var arFev= new Array(e.fevereiro, (e.percFevereiro== -1 ? 0 :e.percFevereiro));
      var arMar= new Array(e.marco,     (e.percMarco== -1 ? 0 :e.percMarco));
      var arAbr= new Array(e.abril,     (e.percAbril== -1 ? 0 :e.percAbril));
      var arMai= new Array(e.maio,      (e.percMaio== -1 ? 0 :e.percMaio));
      var arJun= new Array(e.junho,     (e.percJunho== -1 ? 0 :e.percJunho));
      var arJul= new Array(e.julho,     (e.percJulho== -1 ? 0 :e.percJulho));
      var arAgo= new Array(e.agosto,    (e.percAgosto== -1 ? 0 :e.percAgosto));
      var arSet= new Array(e.setembro,  (e.percSetembro==-1 ? 0 :e.percSetembro));
      var arOut= new Array(e.outubro,   (e.percOutubro==-1 ? 0 :e.percOutubro));
      var arNov= new Array(e.novembro,  (e.percNovembro==-1 ? 0 :e.percNovembro));
      var arDez= new Array(e.dezembro,  (e.percDezembro==-1 ? 0 :e.percDezembro));

      var dados: ContaMensal={name:e.descricaoConta,
                             valor: new Array(
                             this.chbxPercent? arJan[0] : arJan[1], 
                             this.chbxPercent? arFev[0] : arFev[1], 
                             this.chbxPercent? arMar[0] : arMar[1],
                             this.chbxPercent? arAbr[0] : arAbr[1],
                             this.chbxPercent? arMai[0] : arMai[1],
                             this.chbxPercent? arJun[0] : arJun[1],
                             this.chbxPercent? arJul[0] : arJul[1],
                             this.chbxPercent? arAgo[0] : arAgo[1],
                             this.chbxPercent? arSet[0] : arSet[1],
                             this.chbxPercent? arOut[0] : arOut[1],
                             this.chbxPercent? arNov[0] : arNov[1],
                             this.chbxPercent? arDez[0] : arDez[1]),
                             data: new Array(
                              this.chbxPercent? arJan[1] : arJan[0], 
                              this.chbxPercent? arFev[1] : arFev[0], 
                              this.chbxPercent? arMar[1] : arMar[0],
                              this.chbxPercent? arAbr[1] : arAbr[0],
                              this.chbxPercent? arMai[1] : arMai[0],
                              this.chbxPercent? arJun[1] : arJun[0],
                              this.chbxPercent? arJul[1] : arJul[0],
                              this.chbxPercent? arAgo[1] : arAgo[0],
                              this.chbxPercent? arSet[1] : arSet[0],
                              this.chbxPercent? arOut[1] : arOut[0],
                              this.chbxPercent? arNov[1] : arNov[0],
                              this.chbxPercent? arDez[1] : arDez[0])};                  
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
    var arJan = new Array(totJan, PercentCalculo.calcularPercentual(totJan,totDea));
    var arFev = new Array(totFev, PercentCalculo.calcularPercentual(totFev,totJan));
    var arMar = new Array(totMar, PercentCalculo.calcularPercentual(totMar,totFev));
    var arAbr = new Array(totAbr, PercentCalculo.calcularPercentual(totAbr,totMar));
    var arMai = new Array(totMai, PercentCalculo.calcularPercentual(totMai,totAbr));
    var arJun = new Array(totJun, PercentCalculo.calcularPercentual(totJun,totMai));
    var arJul = new Array(totJul, PercentCalculo.calcularPercentual(totJul,totJun));
    var arAgo = new Array(totAgo, PercentCalculo.calcularPercentual(totAgo,totJul));
    var arSet = new Array(totSet, PercentCalculo.calcularPercentual(totSet,totAgo));
    var arOut = new Array(totOut, PercentCalculo.calcularPercentual(totOut,totSet));
    var arNov = new Array(totNov, PercentCalculo.calcularPercentual(totNov,totOut));
    var arDez = new Array(totDez, PercentCalculo.calcularPercentual(totDez,totNov));
    var dados: ContaMensal={ name: arSaldos.length + " Conta(s) selecionada(s)",
                            valor: new Array(
                              this.chbxPercent? arJan[0] : arJan[1], 
                              this.chbxPercent? arFev[0] : arFev[1], 
                              this.chbxPercent? arMar[0] : arMar[1],
                              this.chbxPercent? arAbr[0] : arAbr[1],
                              this.chbxPercent? arMai[0] : arMai[1],
                              this.chbxPercent? arJun[0] : arJun[1],
                              this.chbxPercent? arJul[0] : arJul[1],
                              this.chbxPercent? arAgo[0] : arAgo[1],
                              this.chbxPercent? arSet[0] : arSet[1],
                              this.chbxPercent? arOut[0] : arOut[1],
                              this.chbxPercent? arNov[0] : arNov[1],
                              this.chbxPercent? arDez[0] : arDez[1]),
                             data: new Array(
                              this.chbxPercent? arJan[1] : arJan[0], 
                              this.chbxPercent? arFev[1] : arFev[0], 
                              this.chbxPercent? arMar[1] : arMar[0],
                              this.chbxPercent? arAbr[1] : arAbr[0],
                              this.chbxPercent? arMai[1] : arMai[0],
                              this.chbxPercent? arJun[1] : arJun[0],
                              this.chbxPercent? arJul[1] : arJul[0],
                              this.chbxPercent? arAgo[1] : arAgo[0],
                              this.chbxPercent? arSet[1] : arSet[0],
                              this.chbxPercent? arOut[1] : arOut[0],
                              this.chbxPercent? arNov[1] : arNov[0],
                              this.chbxPercent? arDez[1] : arDez[0])};                  
      this.arSeries.push(dados);
  }

  private options(arSeries: ContaMensal[], ano: string, checkPercent: boolean):any{
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
        text: '',
      },
      labels: {
        formatter: (value) => { 
          return checkPercent ?
                 formatPercent(Number.parseFloat(value), "PT-BR", "0.0-2") :
                 formatCurrency(Number.parseFloat(value), "PT-BR", "R$");
        }
      }/*,
      min: -1*/
    },
    xaxis: {
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
    tooltip: {
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          var valor01 = checkPercent ? 
                        formatPercent(Number.parseFloat(value), "PT-BR", "0.0-2") : 
                        formatCurrency(Number.parseFloat(value), "PT-BR", "R$");
          var valor02 = checkPercent ? 
                        formatCurrency(Number.parseFloat(w.globals.initialSeries[seriesIndex].valor[dataPointIndex]), "PT-BR", "R$") :
                        formatPercent(Number.parseFloat(w.globals.initialSeries[seriesIndex].valor[dataPointIndex]), "PT-BR", "0.0-2");
          
          return valor01 + ' (' + valor02 +')';
        }
      }        
    },
    };
  }  
}
