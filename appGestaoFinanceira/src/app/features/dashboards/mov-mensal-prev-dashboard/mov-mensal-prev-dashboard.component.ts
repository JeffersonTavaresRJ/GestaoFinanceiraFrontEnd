import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { formatCurrency } from '@angular/common';
import { Categoria } from '../../cadastros-basicos/_models/categoria-model';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { DadosChartItem } from '../_models/dados-chart-item';

@Component({
  selector: 'app-mov-mensal-prev-dashboard',
  templateUrl: './mov-mensal-prev-dashboard.component.html',
  styleUrls: ['./mov-mensal-prev-dashboard.component.css']
})
export class MovMensalPrevDashboardComponent implements OnInit {
  arMovPrev: MovimentacaoPrevista[];
  arMovPrevAux: MovimentacaoPrevista[];
  arDadosChartSeries:DadosChartItem[]=[];
  arDadosChartDates: string[]=[];
  arCategoriasAux: Categoria[]=[];
  arItensMov: ItemMovimentacao[]=[];
  arItensMovAux: ItemMovimentacao[]=[];
  idCategoria:Number=null;
  idItemMovimentacao:Number=null;
  dataIni: Date;
  dataFim: Date;
  isRenderChart:boolean;
  chart:ApexCharts;

  constructor(private actResourceRoute: ActivatedRoute) {

      this.actResourceRoute.data.subscribe(
        (sucess: { resolveMovPrev: MovimentacaoPrevista[] }) => {
                   //considerar somente Movimentações Diárias..
                   this.arMovPrev = sucess.resolveMovPrev
                                          .filter(x=>x.itemMovimentacao.tipoOperacao=="MD");
                          
        }
      );
  
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveItemMov: ItemMovimentacao[] }) => {
                  //considerar somente Movimentações Diárias..
                   this.arItensMov = sucess.resolveItemMov.filter(i=>i.tipoOperacao=="MD");
                   this.arItensMovAux = this.arItensMov;                
                          
        }
      );
  }

  ngOnInit(): void {
    this.dataIni = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataIni, '-');
    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.renderizarChart(this.arMovPrev);
  }

  renderizarChart(arpMovPrev: MovimentacaoPrevista[]) {

    this.popularDropdowns();   
    

    this.arMovPrevAux = arpMovPrev.filter(x=>x.itemMovimentacao.categoria.id == this.idCategoria || this.idCategoria==null)
                                  .filter(x=>x.itemMovimentacao.id == this.idItemMovimentacao || this.idItemMovimentacao==null);

    this.isRenderChart = this.arMovPrevAux.length > 0;

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    if (this.isRenderChart){
   
          this.montarArrayPeriodo(this.dataIni, this.dataFim);

          this.agruparPorMes(this.arMovPrevAux, this.idCategoria, this.idItemMovimentacao);

          var options = this.options();      
          this.chart = new ApexCharts(document.querySelector("#chart-real-prev"), options);
          this.chart.render();
    }    
  } 
 
  private montarArrayPeriodo(dataIni: any, dataFim: any) {
    this.arDadosChartDates.length=0;
    for (let data = dataIni; data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)) {
         this.arDadosChartDates.push(DateConvert.formatDateMMYYYY(data,'/'));
    }  
  }

  private agruparPorMes(arMovimentacaoPrevista:MovimentacaoPrevista[], idCategoria?:Number, idItemMovimentacao?:Number){
    
    this.arDadosChartSeries.length=0;    

    if(idCategoria==null && idItemMovimentacao==null){      

      arMovimentacaoPrevista
        .map(x => x.itemMovimentacao.tipoDescricao)
        .filter((value, index, self) => self.indexOf(value) === index)
        .forEach(
          tipoDescricao=>{
            var dadosChart = new DadosChartItem(tipoDescricao, []);

            this.arDadosChartDates.forEach(
              dataReferencia=>{
                let valor: number=0;
                arMovimentacaoPrevista
                             .filter(mp=>DateConvert.formatDateMMYYYY(mp.dataReferencia, "/")==dataReferencia &&
                                     mp.itemMovimentacao.tipoDescricao==tipoDescricao)
                             .forEach(mp=>{valor+= mp.valor});
                        
                dadosChart.data.push(valor);
            }
          );   
          this.arDadosChartSeries.push(dadosChart);  
      });
     

    }else if (idItemMovimentacao!= null){

      arMovimentacaoPrevista
        .filter(x=>x.itemMovimentacao.id==idItemMovimentacao)
        .map(x =>x.itemMovimentacao.descricao)
        .filter((value, index, self) => self.indexOf(value) === index)        
        .forEach(
          descricao=>{
            var dadosChart = new DadosChartItem(descricao, []);

            this.arDadosChartDates.forEach(
              dataReferencia=>{
                let valor: number=0;
                arMovimentacaoPrevista
                             .filter(mp=>DateConvert.formatDateMMYYYY(mp.dataReferencia, "/")==dataReferencia)
                             .forEach(mp=>{valor+= mp.valor});
                        
                dadosChart.data.push(valor);
            }
          );   
          this.arDadosChartSeries.push(dadosChart);  
      });

    }else if(idCategoria!=null){

      arMovimentacaoPrevista
      .filter(x=>x.itemMovimentacao.categoria.id==idCategoria)
      .map(x =>x.itemMovimentacao.categoria.descricao)   
      .filter((value, index, self) => self.indexOf(value) === index)     
      .forEach(
        descricao=>{
          //debugger;
          var dadosChart = new DadosChartItem(descricao, []);

          this.arDadosChartDates.forEach(
            dataReferencia=>{
              let valor: number=0;
              arMovimentacaoPrevista
                           .filter(mp=>DateConvert.formatDateMMYYYY(mp.dataReferencia, "/")==dataReferencia)
                           .forEach(mp=>{valor+= mp.valor});
                      
              dadosChart.data.push(valor);
          }
        );   
        this.arDadosChartSeries.push(dadosChart);  
    });

    }
  }  

  private options():any{
    return {
      series: this.arDadosChartSeries,
        chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#A52A2A','#1C86EE'],
      dataLabels: {
        enabled: false,
        formatter(value) {
          return formatCurrency(Number.parseFloat(value), "PT-BR", "R$");
        }
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Movimentações Mensais Previstas',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.arDadosChartDates        
      },
      yaxis: {
        title: {
          text: 'Valor'
        },
        labels: {
          formatter: (value) => { 
            return formatCurrency(Number.parseFloat(value), "PT-BR", "R$"); 
          }
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
      
    }
  }

  private popularDropdowns(){

    this.arCategoriasAux = this.arItensMov.map((e)=>{return e.categoria});

    let uniqueCategoria = [...new Map(this.arCategoriasAux.map((item) => [item["id"], item]))
                                                          .values(), ];    
    this.arCategoriasAux = uniqueCategoria;

    if(this.idCategoria != null){
      this.arItensMovAux = this.arItensMov.filter(x=>x.categoria.id ==this.idCategoria);
    }

    if(this.idItemMovimentacao != null){
      this.arCategoriasAux = this.arItensMov.filter(x=>x.id ==this.idItemMovimentacao)
                                               .map((e)=>{return e.categoria});
    }

    this.idCategoria        = this.idCategoria==null && this.arCategoriasAux.length==1?this.arCategoriasAux[0].id:this.idCategoria;
    this.idItemMovimentacao = this.idCategoria!=null && this.arItensMovAux.length==1?this.arItensMovAux[0].id:this.idItemMovimentacao;
  }
}