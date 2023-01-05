import { formatCurrency} from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { ContaService } from '../../cadastros-basicos/_services/conta-service';


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
  seriesTipo:Number[] = [];
  labelsTipo:string[] = [];
  seriesItem:Number[] = [];
  labelsItem:string[] = [];
  arFechamentosMensais:FechamentoModel[];
  arMovReal: MovimentacaoRealizada[]=[];
  arContas:Conta[]=[];
  arMovRealTipo: any[]=[];
  arMovRealItem: any[]=[];
  selectedMesAno: string=""; 
  idConta: number;
  chartTipo: ApexCharts;
  chartItem: ApexCharts;
  constructor(protected fechamentoService: FechamentoService,
              protected movRealizadaService: MovRealizadaService,
              protected contaService: ContaService) {

      this.fechamentoService.getAll().subscribe(
      sucess=>{
          this.arFechamentosMensais = sucess;
          
          this.contaService.getAll().subscribe(
            sucess=> {this.arContas = sucess}
          );

          this.movRealizadaService.getByDataReferencia().subscribe(
             sucess=>{
                         this.arMovReal = sucess;
                         this.arMovRealTipo = this.movRealPorTipo(this.arMovReal);
                         this.renderizarChartTipo(this.arMovRealTipo);         
                      }
                    )
                  }
                )

  }

  ngOnInit(): void {}

  onChangeFechamento(){    
    this.movRealizadaService.getByDataReferencia(null, this.selectedMesAno).subscribe(
      success=>{
        this.arMovReal = success;

        this.visibleChartItem(false);
        if(this.chartItem!=null){
             this.chartItem.destroy();
        }
        
        this.arMovRealTipo = this.movRealPorTipo(this.arMovReal, this.idConta);
        this.renderizarChartTipo(this.arMovRealTipo);
      }
    )
    
  }

  onChangeConta(){
    this.visibleChartItem(false);
    if(this.chartItem!=null){
      this.chartItem.destroy();
    }
    this.arMovRealTipo = this.movRealPorTipo(this.arMovReal, this.idConta);
    this.renderizarChartTipo(this.arMovRealTipo);
  }

  private movRealPorTipo(arr: MovimentacaoRealizada[], idConta?:number):any[]{
    //agrupando por item de movimentacao..
    var result = [];

    if(idConta>0){
      arr = arr.filter(x=>x.conta.id==idConta)
    }

    arr.reduce(function(acumulador, obj){
      if (!acumulador[obj.itemMovimentacao.tipo]){
          acumulador[obj.itemMovimentacao.tipo] = {Descricao: obj.itemMovimentacao.tipoDescricao, Tipo: obj.itemMovimentacao.tipo, Valor: 0};
          result.push(acumulador[obj.itemMovimentacao.tipo]);
      }
      acumulador[obj.itemMovimentacao.tipo].Valor+=obj.valor;      
      return acumulador;
    }, []);
    return result;
  }
  
  private movRealPorItem(arr: MovimentacaoRealizada[], idConta?:number):any[]{
    //agrupando por item de movimentacao..
    var result = [];

    if(idConta>0){
      arr = arr.filter(x=>x.conta.id==idConta)
    }

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
 
  private renderizarChartTipo(arr:any[]){
    this.labelsTipo.length=0;
    this.seriesTipo.length=0;    
    var saldo=null;

    //preenchendo as Series e Labels do chart..
    arr.map(x=>{
      this.labelsTipo.push(x.Descricao);
      this.seriesTipo.push(x.Valor);
      saldo+= x.Tipo=="D"? x.Valor*-1 : x.Valor;
    });

    var options = this.options(this.seriesTipo, this.labelsTipo,"chart-tipo", " da Conta", saldo);
    this.chartTipo = new ApexCharts(document.querySelector("#chart-tipo"), options);
    this.chartTipo.render();
    this.chartTipo.updateOptions(options);
  }

  private renderizarChartItem(arr:any[], tipo: string, descricaoTipo:string){
    this.labelsItem.length=0;
    this.seriesItem.length=0;

    arr = arr.filter(x=>x.Tipo==tipo); 
    
    //preenchendo as Series e Labels do chart..
    arr.map(x=>{
      this.labelsItem.push(x.Descricao);
      this.seriesItem.push(x.Valor);
    });

    this.visibleChartItem(true);

    var options = this.options(this.seriesItem, this.labelsItem, "chart-item", descricaoTipo);

    if(this.chartItem!=null){
      this.chartItem.destroy();
    }
    this.chartItem = new ApexCharts(document.querySelector("#chart-item"), options);
    this.chartItem.render();   
    
  }

  private visibleChartItem(status:boolean){
    var divItem = document.querySelector('#chart-item');
    divItem.removeAttribute("class");
    if(!status){
      divItem.classList.add("hideChart");
    }
  }

  private options(series:Number[], labels:string[], idChart:string, titulo:string, saldo?:number):any{
    return {
      chart: {
        width: "100%",
        height:"300",
        type: "donut",
        id: idChart,
        events: {
          //utilizando a referência de uma function "()=>{} para invocar functions externos.."
          dataPointSelection: (event:any, chartContext:any, config:any) => {            
            debugger;
            if (config.w.config.chart.id=="chart-tipo"){                           
              var tipo = config.w.config.labels[config.dataPointIndex];              
              this.arMovRealItem = this.movRealPorItem(this.arMovReal, this.idConta);
              this.renderizarChartItem(this.arMovRealItem, tipo.substring(0,1), tipo);
            }
          }
        }
      },
      colors: idChart =="chart-tipo"? ['#1C86EE', '#A52A2A'] : undefined,
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          //return Math.round((val+ Number.EPSILON) * 100) / 100 +"%";
          return Number.parseFloat(val).toFixed(2) +"%";
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Arial',
          fontWeight: 100}
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
                label:saldo!=null?"Saldo "+titulo:"Total "+titulo,
                showAlways:true,
                color:"#000000",
                fontSize: '12px',
                fontWeight:'bold',
                formatter: function (w) {
                  var value = saldo!=null? saldo : 
                              w.globals.seriesTotals.reduce((a, b) => {return a+b},0);
                  return formatCurrency(value, "PT-BR", "R$");
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