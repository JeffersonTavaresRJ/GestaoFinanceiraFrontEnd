import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { Movimentacao } from '../../lancamentos/_models/movimentacao';
import { MovPrevistaService } from '../../lancamentos/_services/mov-prevista-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

interface DadosChartSintet{ Data?: string; Planejado?: Number; Receita?: Number; Despesa?:Number };
interface DadosChartAnalit{ Data?: string; Tipo?: string; TipoDescricao?: string; Valor?:Number };

@Component({
  selector: 'app-plan-real-anual-dashboard',
  templateUrl: './plan-real-anual-dashboard.component.html',
  styleUrls: ['./plan-real-anual-dashboard.component.css']
})


export class PlanRealAnualDashboardComponent implements OnInit {

  arMovPrev: MovimentacaoPrevista[]=[];
  arMovReal: MovimentacaoRealizada[]=[];
  dataIni:Date;
  dataFim:Date;
  mesAno:string;
  idConta:number;
  rdbTipo:string="D";
  isRenderChart: boolean;
  chart:ApexCharts;
  arContas:Conta[]=[];
  arDadosChart:DadosChartSintet[]=[];
  arPlanejado:Number[]=[];
  arDespesas:Number[]=[];
  arReceitas:Number[]=[];
  arMesAno:string[]=[];

  constructor(private actResourceRoute: ActivatedRoute,
              private movPrevistaService: MovPrevistaService,
              private movRealizadaService: MovRealizadaService) {

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovPrev: MovimentacaoPrevista[] }) => {
                 //considerar somente movimentações diárias..
                 this.arMovPrev = sucess.resolveMovPrev
                                        .filter(x=>x.itemMovimentacao.tipoOperacao=="MD");
                        
      }
    );

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
                  //considerar somente movimentações diárias..
                  this.arMovReal = sucess.resolveMovReal
                                         .filter(x=>x.itemMovimentacao.tipoOperacao=="MD");
                        
      }
    );
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta;  
      }
    );
    
   }

  ngOnInit(): void {
    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.montarArrayPeriodo(this.dataFim);
    this.renderizarChart(this.arMovPrev, this.arMovReal);
  }
 
  populate(){
    this.arMovPrev.length=0;
    this.arMovReal.length=0;    
  

    this.montarArrayPeriodo(new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()+1, 0));

    var dataIni = DateConvert.formatDateYYYYMMDD(new Date(this.dataFim.getFullYear()-1, this.dataFim.getMonth(), 1),'-');
    var dataFim = DateConvert.formatDateYYYYMMDD(new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()+1, 0), '-');

    this.movPrevistaService.getByDataVencimento(dataIni, dataFim).subscribe(
      (success:MovimentacaoPrevista[])=>{
        this.arMovPrev = success;        

        this.movRealizadaService.GetByDataMovimentacaoRealizada(dataIni, dataFim).subscribe(
          (success:MovimentacaoRealizada[])=>{
            this.arMovReal = success;
            this.renderizarChart(this.arMovPrev, this.arMovReal);
          }
        );
      }
    );  

  }

  renderizarChart(arMovPrevista:MovimentacaoPrevista[], arMovRealizada:MovimentacaoRealizada[]){

    if(this.chart!=null){      
      this.chart.destroy();   
    }

    if(arMovPrevista.length==0 || arMovRealizada.length==0 ){ 
      this.isRenderChart =false;     
      return false;
    }

    //tratamento para não alterar os valores dos arrays carregados pela execução da API..
    var arrMovPrev = new Array();
    arrMovPrev = arMovPrevista;

    var arrMovReal = new Array();
    arrMovReal = arMovRealizada;

    //filtro por conta..
    if(this.idConta!=null && this.idConta >0){
       var arr        = new Array();

       //filtrando os itens de movimentação associados à conta informada..
       arrMovReal = arrMovReal.filter(m=>m.conta.id==this.idConta)
                                      .sort((a,b)=>{return a.itemMovimentacao.id - b.itemMovimentacao.id});

       //filtrando movimentação prevista por item de movimentação da conta selecionada.. 
       var idItemMovAux = -1;
       arrMovReal.forEach(r=>{
          if(idItemMovAux != r.itemMovimentacao.id){
            arrMovPrev.filter(p=>p.itemMovimentacao.id==r.itemMovimentacao.id)
                         .forEach( obj=>{arr.push(obj)});
            idItemMovAux = r.itemMovimentacao.id;
          }
       });
       arrMovPrev = arr;
    }

    this.isRenderChart =true;
    this.arMesAno.length=0;
    this.arPlanejado.length=0;
    this.arDespesas.length=0;
    this.arReceitas.length=0;

    var arMovPrevGroup = this.agruparPorMes(arrMovPrev);
    var arMovRealGroup = this.agruparPorMes(arrMovReal);

    //limpeza dos valores: planejado, receita e despesa..
    this.montarArrayPeriodo(this.dataFim);

    this.arDadosChart = this.arDadosChart.map((e)=>{
      arMovPrevGroup.forEach(p=>{
          e.Planejado = e.Data == p.Data && p.Tipo==this.rdbTipo? p.Valor:e.Planejado;                 
       })

       arMovRealGroup.forEach(r=>{
          e.Despesa = e.Data == r.Data && r.Tipo=="D"? r.Valor:e.Despesa;
          e.Receita = e.Data == r.Data && r.Tipo=="R"? r.Valor:e.Receita;        
       })
       return e;
    });

    this.arDadosChart.forEach(d=>{
      this.arMesAno.push(d.Data);
      this.arPlanejado.push(d.Planejado);
      this.arDespesas.push(d.Despesa);
      this.arReceitas.push(d.Receita);
    })

    var tipo=this.rdbTipo=="D" ? "Despesa" : "Receita";
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
      name: "Planejado por " + tipo,
      type: 'line',
      data: this.arPlanejado
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
    title: {
      text: 'Movimentação Anual: Planejada x Realizada',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
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
    colors: ['#A52A2A', '#1C86EE', '#DEB887'],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'string'
    },
    yaxis: {
      title: {
        text: 'Valor',
      },
      labels: {
        formatter: (value) => { return formatCurrency(Number.parseFloat(value), "PT-BR", "R$") }
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          return formatCurrency(Number.parseFloat(value), "PT-BR", "R$")
        }
      }      
    }
    };  

    this.visibleChartItem(true);    
    this.chart = new ApexCharts(document.querySelector("#chart-plan-real"), options);
    this.chart.render();
  }

  private montarArrayPeriodo(dataFim: Date){
    var dataIni = new Date(dataFim.getFullYear()-1, dataFim.getMonth()+1, 0);
    this.arDadosChart.length=0;
    for (let data = dataIni; data <= dataFim; data=new Date(data.getFullYear(), data.getMonth()+2,0)) {
         var dados: DadosChartSintet={Data:DateConvert.formatDateMMYYYY(data,'/'), Planejado:0, Receita:0, Despesa:0};
         this.arDadosChart.push(dados);
    }
  }

  private agruparPorMes(arr:Movimentacao[]):DadosChartAnalit[]{
    var result:DadosChartAnalit[]=[];
    
    arr.reduce(function(acumulador, obj){
      //a chave do array do acumulador é a dataReferencia + tipo..
      var idx = DateConvert.formatDateYYYYMMDD(obj.dataReferencia, '-')+' - '+obj.itemMovimentacao.tipo;

      if (!acumulador[idx]){          
        var row:DadosChartAnalit = {Data: DateConvert.formatDateMMYYYY(obj.dataReferencia,'/'), 
                                    Tipo: obj.itemMovimentacao.tipo, 
                                    TipoDescricao: obj.itemMovimentacao.tipoDescricao, 
                                    Valor: 0}
        acumulador[idx]=row;
        result.push(acumulador[idx]);
      }
      acumulador[idx].Valor+=obj.valor;
      
      return acumulador;
    }, []);
    return result;
  }

  private visibleChartItem(status:boolean){
    var divItem = document.querySelector('#chart-plan-real');
    divItem.removeAttribute("class");
    if(!status){
      divItem.classList.add("hideChart");
    }
  }

}
