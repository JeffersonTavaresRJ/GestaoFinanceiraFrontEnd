import { formatCurrency, formatPercent } from '@angular/common';
import { ChartComponent } from "ng-apexcharts";
import { Component, 
         OnInit, 
         ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';
import { FechamentoModel } from '../../lancamentos/_models/fechamento-model';
import { FechamentoService } from '../../lancamentos/_services/fechamento-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-receitas-despesas-dashboard',
  templateUrl: './receitas-despesas-dashboard.component.html',
  styleUrls: ['./receitas-despesas-dashboard.component.css']
})
export class ReceitasDespesasDashboardComponent implements OnInit {
  series:Number[] = [];
  labels:string[] = [];
  arMovReal: any[];
  arMovRealReceita: any[];
  arMovRealDespesa: any[];
  arFechamentosMensais:FechamentoModel[];
  selectedMesAno: string=""; 
  chart: ApexCharts;
  constructor(protected fechamentoService: FechamentoService,
              protected movRealizadaService: MovRealizadaService) {

    this.fechamentoService.getAll().subscribe(
      sucess=>{
          this.arFechamentosMensais = sucess; 
          this.movRealizadaService.getByDataReferencia().subscribe(
             sucess=>{
                         this.arMovReal = this.movRealizadaGroupBy(sucess);
                         this.renderizarChart(this.arMovReal, "#chart-despesa", "D" ); 
                         this.renderizarChart(this.arMovReal, "#chart-receita", "R" );          
                      }
                    )
                  }
                )

  }

  ngOnInit(): void {

  
  }

  private movRealizadaGroupBy(arr: MovimentacaoRealizada[]):any[]{
    //agrupando por item de movimentacao..
    var result = [];
    arr.reduce(function(acumulador, obj){
      if (!acumulador[obj.itemMovimentacao.id]){
          acumulador[obj.itemMovimentacao.id] = {Descricao: obj.itemMovimentacao.descricao, Tipo: obj.itemMovimentacao.tipo, Valor: 0};
          result.push(acumulador[obj.itemMovimentacao.id]);
      }
      acumulador[obj.itemMovimentacao.id].Valor+=obj.valor;      
      return acumulador;
    }, []);
    return result;
  }

  private renderizarChart(arr:any[], idChart:string, tipo: string){
    //filtrando por Despesas ou Receitas..
    var arr_ = arr.filter(x=>x.Tipo==tipo);

    //preenchendo as Series e Labels do chart..
    debugger;
    this.labels.length=0;
    this.series.length=0;
    arr_.map(x=>{
      this.labels.push(x.Descricao);
      this.series.push(x.Valor);
    });
    var options = this.Options(this.series, this.labels);
    var chart = new ApexCharts(document.querySelector(idChart), options);
    chart.render();
  }

  onChange(seconds){
    //this.alteraLayout(seconds);
    //this.populaTela(new Date(this.fechamentoModel.dataReferencia)); 
  }


  Options(series:Number[], labels:string[]):any{
    return {
      chart: {
        width: "100%",
        height: 200,
        type: "donut"
      },
      fill: {
        type: "gradient"
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold'
      },
      },
      series:series,
      labels:labels,
      legend:{
        position:'right',
        horizontalAlign:'left'
      },
      tooltip: {
        y: {
          formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
            return formatCurrency(Number.parseFloat(value), "PT-BR", "R$")
          }
        }        
      },
      plotOptions: {
        pie: {   
          customScale:1,   
          donut: {
            size: '50%',
            labels:{
              show:true,
              total:{
                show:true,
                showAlways:true,
                color:"#000000",
                fontSize: '12px',
                fontWeight:'bold',
                formatter: function (w) {
                  return formatCurrency(w.globals.seriesTotals.reduce((a, b) => {
                    return a+b
                  }, 0), "PT-BR", "R$");
                }
              },
              value:{
                fontSize: '12px',
                fontWeight:'bold',
                offsetY: 4,
                 formatter(val) {
                  return formatCurrency(Number.parseFloat(val), "PT-BR", "R$");
                },
              }
            }
          }
        }    
      }      
    }
  }
}