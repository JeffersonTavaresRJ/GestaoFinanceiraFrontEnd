import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, ApexPlotOptions, ApexLegend} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-receitas-despesas-dashboard',
  templateUrl: './receitas-despesas-dashboard.component.html',
  styleUrls: ['./receitas-despesas-dashboard.component.css']
})
export class ReceitasDespesasDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public plotOptions: Partial<ApexPlotOptions>;
  public legend: Partial<ApexLegend>;
  public tooltip: Partial<any>;
  public labels: string[];
  public series: number[];
  
  constructor() { 

    /*grafico em barras*/
    /*
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Meu primeiro Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
    */
   /**grafico em pizza*/
   this.labels = ['Alimentação', 'Energia Elétrica', 'Água', 'Estudos'];
   this.series = [1050.36,224.56,180,98.94];

   this.legend={
    show:false
   };

   this.tooltip={
    enabled: false
   }
   this.chartOptions = {
    chart: {
      type: 'donut',
      width:"50%",
      height:380
    }
};

  this.plotOptions = {
    pie: {      
      donut: {
        size: '65%',
        labels:{
          show:true,
          total:{
            show:true,
            color:"#000000",
            formatter: function (w) {
              return formatCurrency(w.globals.seriesTotals.reduce((a, b) => {
                return a+b
              }, 0), "PT-BR", "R$");
            }
          },
          value:{
             formatter(val) {
              return formatCurrency(Number.parseFloat(val), "PT-BR", "R$");
            },
          }
        }
      }
    }    
  }
}

  ngOnInit(): void {
  }
}