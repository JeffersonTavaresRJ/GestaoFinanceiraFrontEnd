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
import { ActivatedRoute } from '@angular/router';
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
  series:Number[];
  labels:string[];
  arMovReal: MovimentacaoRealizada[];
  arFechamentosMensais:FechamentoModel[];
  selectedMesAno: string=""; 
  constructor(protected activatedRoute: ActivatedRoute,
              protected fechamentoService: FechamentoService,
              protected movRealizadaService: MovRealizadaService) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamento: any[] }) => {
        this.arFechamentosMensais = sucess.resolveFechamento;        
      });
      this.activatedRoute.data.subscribe(
        (sucess: { resolveMovReal: any[] }) => {
          this.arMovReal=sucess.resolveMovReal;
          
      });

    this.series = [44.56,56.89,98.25,76.74,98.45,25.25];
    this.labels = ["Alimentação", 
                   "Energia Elétrica", 
                   "Água", 
                   "Manutenção Predial", 
                   "Eletrodomésticos", 
                   "Cursos"];
    var options = this.Options(this.series, this.labels);
    var chart = new ApexCharts(document.querySelector("#chart-despesa"), options);
    chart.render();

    this.series = [5600.85,986.39,1589.41];
    this.labels = ["Salário", 
                   "Juros", 
                   "PLR"];
    var options = this.Options(this.series, this.labels);
    var chart = new ApexCharts(document.querySelector("#chart-receita"), options);
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
            return "Teste: " + formatCurrency(Number.parseFloat(value), "PT-BR", "R$")
          }
        },
        /*
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          return ('<div class="arrow_box">' +
                   w.globals.labels[seriesIndex] + ': '+ 
                  '<span>' + formatCurrency(Number.parseFloat(series[seriesIndex]), "PT-BR", "R$") + 
                  '</span>' +
                  '<p>' + 'Percentual: '+ formatPercent(series[seriesIndex]/w.globals.seriesTotals.reduce((a, b) => {
                    return a+b}, 0), "PT-BR", "1.2-2") +'</p>'+
                  '</div>');
              }
              */
        
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