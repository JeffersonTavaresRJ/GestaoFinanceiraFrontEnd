import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-list',
  templateUrl: './mov-realizada-list.component.html',
  styleUrls: ['./mov-realizada-list.component.css']
})
export class MovRealizadaListComponent implements OnInit {

  results:    any[];
  resultsAux: any[];
  formGroup: FormGroup;
  
  dataReferencia: Date;
  arStDate:string[];
  idMovimentacaoRealizada : number;

  constructor(private actResourceRoute: ActivatedRoute,
              private movRealizadaService: MovRealizadaService,
              private alertMessageForm: AlertMessageForm,
              protected formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
           idConta:[1]
        });                
  }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  private movRealizadaList(){
    debugger;
    this.arStDate = this.actResourceRoute.snapshot.params.dataRealIni.split('-');
    this.dataReferencia=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);    
    
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveMovReal: any[]})=>{
        this.results = sucess.resolveMovReal; 
        this.resultsAux = this.results;  
      }
    );
  }

  carregarDados(){
    var ano = this.dataReferencia.getFullYear();
    var mes = this.dataReferencia.getMonth();
    var dataIni = new Date(ano, mes, 1).toString();
    var dataFim = new Date(ano, mes+1, 0).toString();
    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(dataIni, '-'), 
                                                   DateConvert.formatDateYYYYMMDD(dataFim, '-')).subscribe(
      (sucess:any[])=>{
        this.results = sucess;
        this.resultsAux = this.results;
        this.dataReferencia = new Date(ano, mes, 1);
    })
  }

  getConta(_ev: Conta){
   // this.formGroup.get("idConta").setValue(_ev.id);
    this.results = this.resultsAux.filter(x=>x.conta.id===this.formGroup.get("idConta").value);    
  }

  modalDeleteMessage(_idMovimentacaoRealizada: number){
    this.idMovimentacaoRealizada = _idMovimentacaoRealizada;
  }

  eventDelete(event){
    if(event){
      this.movRealizadaService.deleteById(this.idMovimentacaoRealizada)
          .subscribe(sucess=>{
                               this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
                               this.carregarDados()
                              });
    }
  }
  /*
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
  */ 

}
