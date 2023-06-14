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
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogListComponent } from '../dialog-list/dialog-list.component';
import { DataItems, DialogData } from '../_models/dialog-data';


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
  seriesPrioridade:Number[] = [];
  labelsPrioridade:string[] = [];
  arFechamentosMensais:FechamentoModel[];
  arMovReal: MovimentacaoRealizada[]=[];
  arContas:Conta[]=[];
  arMovRealTipo: any[]=[];
  arMovRealPrioridade: any[]=[];
  dialogData: DialogData;
  selectedMesAno: string=""; 
  idConta: number;
  chartTipo: ApexCharts;
  chartPrioridade: ApexCharts;
  headerTitle: String;
  constructor(private actResourceRoute: ActivatedRoute,
              protected movRealizadaService: MovRealizadaService,
              protected dialog : MatDialog
              ) {

                this.actResourceRoute.data.subscribe(
                  (sucess: { resolveFechamento: FechamentoModel[] }) => {
                             this.arFechamentosMensais = sucess.resolveFechamento;  
                  }
                );
            
                this.actResourceRoute.data.subscribe(
                  (sucess: { resolveConta: Conta[] }) => {
                             this.arContas = sucess.resolveConta;  
                  }
                );
            
                this.actResourceRoute.data.subscribe(
                  (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
                             this.arMovReal = sucess.resolveMovReal;
                             this.arMovRealTipo = this.movRealPorTipo(this.arMovReal);
                                    
                  }
                );

              }

  ngOnInit(): void {
    this.renderizarChartTipo(this.arMovRealTipo); 
  }

  onChangeFechamento(){    
    this.movRealizadaService.getByDataReferencia(null, this.selectedMesAno).subscribe(
      success=>{
        this.arMovReal = success;

        this.visibleChartPrioridade(false);
        if(this.chartPrioridade!=null){
             this.chartPrioridade.destroy();
        }
        
        this.arMovRealTipo = this.movRealPorTipo(this.arMovReal, this.idConta);
        this.renderizarChartTipo(this.arMovRealTipo);
      }
    )
    
  }

  onChangeConta(){
    this.visibleChartPrioridade(false);
    if(this.chartPrioridade!=null){
      this.chartPrioridade.destroy();
    }
    this.arMovRealTipo = this.movRealPorTipo(this.arMovReal, this.idConta);
    this.renderizarChartTipo(this.arMovRealTipo);
  }

  private openDialog(titulo:string, prioridade: string, tipo: string, backgroundColor : string) {

    var arMovRealFilter = this.arMovReal.filter(f=>f.itemMovimentacao.tipo==tipo &&
                                                   f.tipoPrioridade==prioridade.substring(0,1));
    var total = arMovRealFilter.reduce((acum,item)=>{return acum+item.valor;},0);

    this.dialogData = new DialogData();
    this.dialogData.header = "Total "+titulo+ ": ("+prioridade+" Prioridade)";
    this.dialogData.backgroundColor = backgroundColor;
    arMovRealFilter.map(m=>{this.dialogData.dataItems.push(new DataItems(m.itemMovimentacao.descricao,m.valor, m.valor/total))});

    this.dialog.open(DialogListComponent, {data: this.dialogData});

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
  
  private movRealPorPrioridade(arr: MovimentacaoRealizada[], tipo: String, idConta?:number):any[]{
    //agrupando por item de movimentacao..
    var result = [];

    arr = arr.filter(x=>x.itemMovimentacao.tipo==tipo);

    if(idConta>0){
      arr = arr.filter(x=>x.conta.id==idConta)
    }

    arr.reduce(function(acumulador, obj){
      if (!acumulador[obj.tipoPrioridade]){
          acumulador[obj.tipoPrioridade] = {Tipo: tipo, Descricao: obj.tipoPrioridadeDescricao, Valor: 0};
          result.push(acumulador[obj.tipoPrioridade]);
      }
      acumulador[obj.tipoPrioridade].Valor+=obj.valor;      
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

  private renderizarChartPrioridade(arr:any[], descricaoTipo:string){
    this.labelsPrioridade.length=0;
    this.seriesPrioridade.length=0;

   //preenchendo as Series e Labels do chart..
    arr.map(x=>{
      this.labelsPrioridade.push(x.Descricao);
      this.seriesPrioridade.push(x.Valor);
    });

    this.visibleChartPrioridade(true);

    var options = this.options(this.seriesPrioridade, this.labelsPrioridade, "chart-item", descricaoTipo);

    if(this.chartPrioridade!=null){
      this.chartPrioridade.destroy();
    }
    this.chartPrioridade = new ApexCharts(document.querySelector("#chart-item"), options);
    this.chartPrioridade.render();   
    
  }

  private visibleChartPrioridade(status:boolean){
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
            if (config.w.config.chart.id=="chart-tipo"){                           
              var tipo = config.w.config.labels[config.dataPointIndex];              
              this.arMovRealPrioridade = this.movRealPorPrioridade(this.arMovReal, tipo.substring(0,1), this.idConta);
              this.renderizarChartPrioridade(this.arMovRealPrioridade, tipo);
            }else{
              var prioridade = config.w.config.labels[config.dataPointIndex];
              var color = config.w.globals.colors[config.dataPointIndex];
              var tipo = this.arMovRealPrioridade.filter(x=>x.Descricao= prioridade)[0].Tipo;
              this.openDialog(titulo, prioridade, tipo, color);
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
                label: saldo!=null? "Saldo Balanço Mensal":"Total "+titulo,
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
                color: saldo<0 ? '#FF0000': '#000000',
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