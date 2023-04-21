import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { formatCurrency, formatPercent } from '@angular/common';


interface ContaAnual{name: string, valor: number[], data: number[]};

@Component({
  selector: 'app-conta-anual-dashboard',
  templateUrl: './conta-anual-dashboard.component.html',
  styleUrls: ['./conta-anual-dashboard.component.css']
})
export class ContaAnualDashboardComponent implements OnInit {
  arSaldos: any[];
  arSaldosAux: any[];
  arContas: Conta[]; 
  arSelectedContas:any[]=[]; 
  arSeries: ContaAnual[]=[];
  ano: string;
  chart: ApexCharts;

  constructor(private actResourceRoute: ActivatedRoute) { 
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveSaldoConta: any[] }) => {
                 this.arSaldos = sucess.resolveSaldoConta;
                 this.arSaldos.forEach(x=>{
                      this.arSelectedContas.push(x.idConta);
                 });                 
      }
    );
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta;  
      }
    );

  }

  ngOnInit(): void {
    this.onChangeConta();
  }
  
  onChangeConta(){
    this.arSaldosAux = this.arSaldos;
    this.arSaldosAux = this.arSaldosAux.filter(x=>this.arSelectedContas.map((e)=>{return e}).includes(x.idConta));
    //this.populate(this.arSaldosAux); 
    this.totalizar(this.arSaldosAux); 
    this.renderizarChart();
  }

  private renderizarChart(){
    var ano = this.actResourceRoute.snapshot.params.ano;
    var options = this.options(this.arSeries, ano);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-conta-anual"), options);
    this.chart.render();
  }

  private populate(arSaldos:any[]){
    this.arSeries.length=0;
    arSaldos.forEach(e=>{
      var dados: ContaAnual={name:e.descricaoConta,
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
                             data: new Array(e.percJaneiro, 
                                             e.percFevereiro, 
                                             e.percMarco,
                                             e.percAbril,
                                             e.percMaio,
                                             e.percJunho,
                                             e.percJulho,
                                             e.percAgosto,
                                             e.percSetembro,
                                             e.percOutubro,
                                             e.percNovembro,
                                             e.percDezembro)};                  
      this.arSeries.push(dados);
     });
  }

  private totalizar(arSaldos:any[]){
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
    var dados: ContaAnual={ name: arSaldos.length + " Conta(s) selecionada(s)",
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
                             data: new Array(this.calcularPercentual(totJan,totDea), 
                                             this.calcularPercentual(totFev,totJan), 
                                             this.calcularPercentual(totMar,totFev),
                                             this.calcularPercentual(totAbr,totMar),
                                             this.calcularPercentual(totMai,totAbr),
                                             this.calcularPercentual(totJun,totMai),
                                             this.calcularPercentual(totJul,totJun),
                                             this.calcularPercentual(totAgo,totJul),
                                             this.calcularPercentual(totSet,totAgo),
                                             this.calcularPercentual(totOut,totSet),
                                             this.calcularPercentual(totNov,totOut),
                                             this.calcularPercentual(totDez,totNov))};                  
      this.arSeries.push(dados);
  }

  private calcularPercentual(ValorAtual: number, ValorAnterior: number): number{
    return (ValorAtual-ValorAnterior) / (ValorAnterior==0 ? (ValorAtual==0 ? 1 : ValorAtual) : ValorAnterior);
  }

  private options(arSeries: ContaAnual[], ano: string):any{
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
      text: 'Saldo Anual por Conta: Ano '+ano,
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
          return formatPercent(Number.parseFloat(value), "PT-BR", "2.1-2") 
        }
      },
      min: 0
    },
    xaxis: {
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
    tooltip: {
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatPercent(Number.parseFloat(value), "PT-BR", "2.1-2") + 
          ' (' + formatCurrency(Number.parseFloat(w.globals.initialSeries[seriesIndex].valor[dataPointIndex]), "PT-BR", "R$") +')'
        }
      }        
    },
    };
  }  
}
