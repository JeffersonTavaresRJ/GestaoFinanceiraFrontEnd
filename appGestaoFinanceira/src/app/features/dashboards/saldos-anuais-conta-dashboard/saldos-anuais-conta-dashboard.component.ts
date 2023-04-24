import { Component, OnInit } from '@angular/core';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { ActivatedRoute } from '@angular/router';
import { formatCurrency, formatPercent } from '@angular/common';

interface ContaAnual{name: string, data: number[], id: number, valor: number[]};

@Component({
  selector: 'app-saldos-anuais-conta-dashboard',
  templateUrl: './saldos-anuais-conta-dashboard.component.html',
  styleUrls: ['./saldos-anuais-conta-dashboard.component.css']
})
export class SaldosAnuaisPorContaDashBoardComponent implements OnInit {
  arSaldos: any[];
  arContas: Conta[];
  arDadosChart: ContaAnual[]=[];
  arSelectedContas:any[]=[]; 
  arContasDadosChart:Conta[]=[];
  arAno:number[]=[];
  ano: string;
  anoIni:number;
  anoFim:number;
  chbxAgrupar: boolean;
  chart: ApexCharts;

  constructor(private actResourceRoute: ActivatedRoute) { 
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveSaldoPeriodoConta: any[] }) => {
                 this.arSaldos = sucess.resolveSaldoPeriodoConta.sort((a,b)=>{return a.ano-b.ano});
                 this.arContasDadosChart = this.arSaldos.map((e)=>{return new Conta(e.idConta, e.descricaoConta)})
                                                .filter((value, index, array)=>{
                                                  return array.indexOf(value) === index;
                                                });
                 this.arSelectedContas = this.arContasDadosChart.map((e)=>{return e.id});                 
      }
    );
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta;
      }
    );

  }

  ngOnInit(): void {

    this.anoIni = Number.parseInt(this.actResourceRoute.snapshot.params.anoInicial);
    this.anoFim = Number.parseInt(this.actResourceRoute.snapshot.params.anoFinal); 

    for(let ano=this.anoIni; ano <= this.anoFim; ano++){
      //carga do array de categorias do chart..
      this.arAno.push(ano);
    }  

    this.filtrarDados(this.arSaldos, this.anoIni, this.anoFim);

    
  }

  filtrarDados(arSaldos: any[], anoIni:number, anoFim: number){    

    var arSaldosAux = arSaldos.filter(x=>this.arSelectedContas.map((e)=>{return e}).includes(x.idConta));
    
    this.arContasDadosChart = arSaldosAux.map((e)=>{return new Conta(e.idConta, e.descricaoConta)})
                                         .filter((value, index, array)=>{
                                                  return array.indexOf(value) === index;
                                                });


    this.montarArrayPeriodo(this.arContasDadosChart, anoIni, anoFim);

    this.populateDetalhado(arSaldosAux, anoIni, anoFim); 

    this.renderizarChart(this.arDadosChart, this.arAno);
  }

  private renderizarChart(arDadosChart: ContaAnual[], arAno: number[]){   
    var options = this.options(arDadosChart, arAno);

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    this.chart = new ApexCharts(document.querySelector("#chart-saldos-anuais-conta"), options);
    this.chart.render();
  }

  private montarArrayPeriodo(arContas:Conta[], anoIni: number, anoFim: number) {
    this.arDadosChart.length=0;
    arContas.forEach(x=>{
          var dat=[];
          var val=[];
          for(let ano=anoIni; ano <= anoFim; ano++){
            dat.push(0);
            val.push(0);
          }  
          var dados: ContaAnual={id: x.id, name: x.descricao, data: dat, valor: val};
          this.arDadosChart.push(dados);        
    });

  }

  private populateDetalhado(arSaldos: any[], anoInicial: number, anoFinal:number){
    this.arDadosChart.map((x)=>{
        var b=0;
        for(let ano = anoInicial; ano <= anoFinal; ano++){
          var valorAtual = arSaldos.filter(z=>z.idConta==x.id && z.ano==ano).map((e)=>{return e.saldo})[0];
          var valorAnter = arSaldos.filter(z=>z.idConta==x.id && z.ano==ano-1).map((e)=>{return e.saldo})[0];
          
          valorAtual = valorAtual == undefined ? 0 : valorAtual;
          valorAnter = valorAnter == undefined ? 0 : valorAnter;
          
          x.data[b]  = this.calcularPercentual(valorAtual, valorAnter);
          x.valor[b] = valorAtual;
          b++;
        }
    })  
  }  

  private calcularPercentual(ValorAtual: number=0, ValorAnterior: number=0): number{
    return (ValorAtual-ValorAnterior) / (ValorAnterior==0 ? (ValorAtual==0 ? 1 : ValorAtual) : ValorAnterior);
  }

  private options(arSeries: ContaAnual[], arAno: number[]):any{
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
      text: 'Saldos Anuais',
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
      categories: arAno,
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
