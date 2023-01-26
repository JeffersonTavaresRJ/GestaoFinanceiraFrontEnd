import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { Movimentacao } from '../../lancamentos/_models/movimentacao';
import { MovPrevistaService } from '../../lancamentos/_services/mov-prevista-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

@Component({
  selector: 'app-receitas-despesas-anual-dashboard',
  templateUrl: './receitas-despesas-anual-dashboard.component.html',
  styleUrls: ['./receitas-despesas-anual-dashboard.component.css']
})
export class ReceitasDespesasAnualDashboardComponent implements OnInit {

  arMovPrev: MovimentacaoPrevista[]=[];
  arMovReal: MovimentacaoRealizada[]=[];
  mesAno:Date;
  chart:ApexCharts;
  arEstimativa:Number[]=[];
  arDespesas:Number[]=[];
  arReceitas:Number[]=[];
  arMesAno:String[]=[];

  constructor(private actResourceRoute: ActivatedRoute,
              private movPrevistaService: MovPrevistaService,
              private movRealizadaService: MovRealizadaService) {

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovPrev: MovimentacaoPrevista[] }) => {
                 this.arMovPrev = sucess.resolveMovPrev;
                        
      }
    );

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
                 this.arMovReal = sucess.resolveMovReal;
                        
      }
    );

    this.actResourceRoute.paramMap.subscribe(params=>{
      this.mesAno = DateConvert.stringToDate(params.get('dataFim'), '-');
    })
    
   }

  ngOnInit(): void {
    this.renderizarChart(this.arMovPrev, this.arMovReal);
  }

  onSelected(){
    this.populate();
    this.renderizarChart(this.arMovPrev, this.arMovReal);
  }

  private populate(){
    //debugger;
    this.arMovPrev.length=0;
    this.arMovReal.length=0;

    var dataIni = DateConvert.formatDateYYYYMMDD(
                  new Date(this.mesAno.getFullYear()-1, this.mesAno.getMonth(), 1), '-');
    var dataFim = DateConvert.formatDateYYYYMMDD(
                  new Date(this.mesAno.getFullYear(), this.mesAno.getMonth()+1, 0), '-');

    this.movPrevistaService.getByDataVencimento(dataIni, dataFim).subscribe(
      (success:any[])=>{
        this.arMovPrev = success;
      }
    );

    this.movRealizadaService.GetByDataMovimentacaoRealizada(dataIni, dataFim).subscribe(
      (success:MovimentacaoRealizada[])=>{
        this.arMovReal = success;
      }
    );

  }

  private agruparPorMes(arr:Movimentacao[], tipo:string):any[]{
    //debugger;
    var result = [];
    arr.reduce(function(acumulador, obj){
      if (!acumulador[DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')] && tipo == obj.itemMovimentacao.tipo){
          acumulador[DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')] = {MesAno: DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-'), TipoDescricao: obj.itemMovimentacao.tipoDescricao, Valor: 0};
          result.push(acumulador[DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')]);
      }

      if(tipo == obj.itemMovimentacao.tipo){
         acumulador[DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')].Valor+=obj.valor;      
      }
      
      return acumulador;
    }, []);
    return result;
  }

  private visibleChartItem(status:boolean){
    var divItem = document.querySelector('#chart');
    divItem.removeAttribute("class");
    if(!status){
      divItem.classList.add("hideChart");
    }
  }

  private renderizarChart(arMovPrevista:MovimentacaoPrevista[], arMovRealizada:MovimentacaoRealizada[]){
    debugger;
    if(arMovPrevista.length==0 || arMovRealizada.length==0 ){
      this.visibleChartItem(false);
      return false;
    }

    this.arEstimativa.length=0;
    this.arDespesas.length=0;
    this.arReceitas.length=0;
    this.arEstimativa.length=0;

    //estimativa..
    var array = this.agruparPorMes(arMovPrevista, "D");
    array.map(e=>{
      this.arMesAno.push(e.MesAno);
      this.arEstimativa.push(e.Valor);
    });

    //despesas..
    var array = this.agruparPorMes(arMovRealizada, "D");
    array.map(d=>{
      this.arDespesas.push(d.Valor);
    })

    //receitas..
    var array = this.agruparPorMes(arMovRealizada, "R");
    array.map(r=>{
      this.arReceitas.push(r.Valor);
    })

    //mes e ano..


    var options = {
      series: [{
      name: 'Despesas',
      type: 'column',
      data: this.arDespesas
    }, {
      name: 'Receitas',
      type: 'area',
      data: this.arReceitas
    }, {
      name: 'Estimativa',
      type: 'line',
      data: this.arEstimativa
    }],
      chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: this.arMesAno,
    markers: {
      size: 0
    },
    xaxis: {
      type: 'string'
    },
    yaxis: {
      title: {
        text: 'Valor (R$)',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " R$";
          }
          return y;
    
        }
      }
    }
    };  

    this.visibleChartItem(true); 

    if(this.chart!=null){
      this.chart.destroy();
    } 
    
    this.chart = new ApexCharts(document.querySelector("#chart"), options);
    this.chart.render();
  }

}
