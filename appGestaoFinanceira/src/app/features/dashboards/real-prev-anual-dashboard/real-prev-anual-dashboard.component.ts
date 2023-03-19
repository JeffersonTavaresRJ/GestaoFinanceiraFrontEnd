import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { MovPrevistaService } from '../../lancamentos/_services/mov-prevista-service';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

@Component({
  selector: 'app-real-prev-anual-dashboard',
  templateUrl: './real-prev-anual-dashboard.component.html',
  styleUrls: ['./real-prev-anual-dashboard.component.css']
})
export class RealPrevAnualDashboardComponent implements OnInit {
  arMovPrev: MovimentacaoPrevista[];
  arMovReal: MovimentacaoRealizada[];
  arContas: Conta[];
  dataIni: Date;
  dataFim: Date;

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
      
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveConta: Conta[] }) => {
                   this.arContas = sucess.resolveConta;  
        }
      );

     }

  ngOnInit(): void {

    this.dataFim = DateConvert.stringToDate(this.actResourceRoute.snapshot.params.dataFim, '-');
    this.montarArrayPeriodo(this.dataFim);

    var dataIniAux = new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()+6, this.dataFim.getDay());
    var dataFimAux = new Date(this.dataFim.getFullYear(), this.dataFim.getMonth()-6, this.dataFim.getDay());
    
    //filtra os últimos 6 meses da movimentação prevista..
    this.arMovPrev = this.arMovPrev.filter(x=>x.dataReferencia >= dataIniAux &&
                                              x.dataReferencia <= this.dataFim);

    //filtra os primeiros 6 meses da movimentação realizada..
    this.arMovReal = this.arMovReal.filter(x=>x.dataMovimentacaoRealizada >= this.dataIni &&
                                              x.dataMovimentacaoRealizada <= dataFimAux);


    this.renderizarChart(this.arMovPrev, this.arMovReal);

    var options = {
      series: [{
      name: 'Sales',
      data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }],
      chart: {
      height: 350,
      type: 'line',
    },
    forecastDataPoints: {
      count: 7
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
      tickAmount: 10,
      labels: {
        formatter: function(value, timestamp, opts) {
          return opts.dateFormatter(new Date(timestamp), 'dd MMM')
        }
      }
    },
    title: {
      text: 'Forecast',
      align: 'left',
      style: {
        fontSize: "16px",
        color: '#666'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      min: -10,
      max: 40
    }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

  }
  renderizarChart(arMovPrev: MovimentacaoPrevista[], arMovReal: MovimentacaoRealizada[]) {
    //throw new Error('Method not implemented.');
  }
  montarArrayPeriodo(dataFim: any) {
    //throw new Error('Method not implemented.');
  }

}
