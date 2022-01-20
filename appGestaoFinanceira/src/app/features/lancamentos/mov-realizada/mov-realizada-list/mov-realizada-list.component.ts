import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-list',
  templateUrl: './mov-realizada-list.component.html',
  styleUrls: ['./mov-realizada-list.component.css']
})
export class MovRealizadaListComponent implements OnInit {

  results: {dataMovimentacaoRealizada: Date,values:any[]} [];
  dateMonth: Date;

  constructor(private actResourceRoute: ActivatedRoute,
              private movRealizadaService: MovRealizadaService) { }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  private movRealizadaList(){
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveMovReal: MovimentacaoRealizada[]})=>{
        this.results = this.GroupByDataMovimentacaoRealizada(sucess.resolveMovReal);        
        this.dateMonth = new Date(this.results[0].dataMovimentacaoRealizada);
        var year = this.dateMonth.getFullYear();
        var month= this.dateMonth.getMonth();
        this.dateMonth = new Date(year,month,1,0,0,0,0);
      }
    );
  }

  GroupByDataMovimentacaoRealizada(arMovRealizada: MovimentacaoRealizada[]): any[]
  {
    debugger;
    arMovRealizada.sort(function(a,b){return (((new Date(b.dataMovimentacaoRealizada).getFullYear()*10000)+(new Date(b.dataMovimentacaoRealizada).getMonth()*100)+(new Date(b.dataMovimentacaoRealizada).getDate()))-
                                              ((new Date(a.dataMovimentacaoRealizada).getFullYear()*10000)+(new Date(a.dataMovimentacaoRealizada).getMonth()*100)+(new Date(a.dataMovimentacaoRealizada).getDate())));
  }); 
    var groups = new Set(arMovRealizada.map(item => item.dataMovimentacaoRealizada)), 
    resultGroup = [];
    groups.forEach(g => 
      resultGroup.push(
              {
                dataMovimentacaoRealizada: g, 
                values: arMovRealizada.filter(i => i.dataMovimentacaoRealizada === g)
              })
           );
    return resultGroup;
  }

  carregarDados(){
    var ano = this.dateMonth.getFullYear();
    var mes = this.dateMonth.getMonth();
    var dataIni = new Date(ano, mes, 1).toString();
    var dataFim = new Date(ano, mes+1, 0).toString();
    this.movRealizadaService.GetByDataMovimentacaoRealizada(DateConvert.formatDateYYYYMMDD(dataIni, '-'), 
                                                            DateConvert.formatDateYYYYMMDD(dataFim, '-')).subscribe(
      (sucess:MovimentacaoRealizada[])=>{
        this.results = this.GroupByDataMovimentacaoRealizada(sucess);
      })
  }

}
