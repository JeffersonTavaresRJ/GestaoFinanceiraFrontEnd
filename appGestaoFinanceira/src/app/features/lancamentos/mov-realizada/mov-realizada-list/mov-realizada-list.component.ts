import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { ContaService } from 'src/app/features/cadastros-basicos/_services/conta-service';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-list',
  templateUrl: './mov-realizada-list.component.html',
  styleUrls: ['./mov-realizada-list.component.css']
})
export class MovRealizadaListComponent implements OnInit {

  results: any[];
  resultsAux: any[];
  formGroup: FormGroup;

  dataReferencia: Date;
  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  displayDetalhe:boolean;
  idMovimentacaoRealizada: number;
  movimentacaoRealizadaDetalhe: MovimentacaoRealizada = new MovimentacaoRealizada();
  contaOld: Conta;


  constructor(private actResourceRoute: ActivatedRoute,
    private movRealizadaService: MovRealizadaService,
    private contaService : ContaService,
    private alertMessageForm: AlertMessageForm,
    protected formBuilder: FormBuilder) {    
    this.formGroup = this.formBuilder.group({
      idConta: [null],
    });
  }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  private movRealizadaList() {
    debugger;
    this.arStDate = this.actResourceRoute.snapshot.params.dataIni.split('-');

    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.dataReferencia = this.dataIni;

    this.arStDate = this.actResourceRoute.snapshot.params.dataFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: any[] }) => {
        this.results = sucess.resolveMovReal;
        this.resultsAux = this.results;

        //Setando a conta default como parâmetro de pesquisa..
        this.contaService.getAll().subscribe(
          sucess=>{
            this.contaOld = sucess.filter(x=>x.defaultConta=="S")[0];
            this.formGroup.get('idConta').setValue(this.contaOld.id);
            this.filtrarTablePorParametros(this.contaOld.id);            
          }
        )
        
      }
    );
  }

  filtrarTablePorPeriodo() {
    debugger;
    this.dataFim = new Date(this.dataIni.getFullYear(),
      this.dataIni.getMonth() + 1,
      0);

    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(this.dataIni.toString(), '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim.toString(), '-')).subscribe(
        (sucess: any[]) => {
          this.results = sucess;
          this.resultsAux = this.results;
          this.filtrarTablePorParametros(this.formGroup.get('idConta').value);
        });
  }

  getConta(conta: Conta){
    //alterando a conta anterior que foi utilizada como filtro para deixar de ser o filtro default para pesquisa..
    if(this.contaOld != null){
      this.contaOld.defaultConta = 'N';
      this.contaService.putConta(this.contaOld).subscribe(
        sucess=>{
          this.contaOld = conta;
        }
      )
    }
    //alterando a conta atual que está sendo utilizada como filtro para ser o filtro default para pesquisa..
    conta.defaultConta = 'S';
    this.contaService.putConta(conta).subscribe(
      sucess=>{
        this.contaOld = conta;
        this.filtrarTablePorParametros(conta.id)
      }
    )
  }

  filtrarTablePorParametros(idConta?: Number) {
    //debugger;
    this.results = this.resultsAux;
    if (idConta != null){
      this.results = this.resultsAux.filter(m => m.conta.id == idConta);
    }else{
      this.alertMessageForm.showError("A conta deve ser informada", "Sr. Usuário");
    }
  }

  modalDeleteMessage(_idMovimentacaoRealizada: number) {
    this.idMovimentacaoRealizada = _idMovimentacaoRealizada;
  }

  modalDetalhe(movimentacaoRealizada: MovimentacaoRealizada) {
   this.displayDetalhe = true;
   this.movimentacaoRealizadaDetalhe = movimentacaoRealizada;
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovimentacaoRealizada)
        .subscribe(sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.filtrarTablePorPeriodo()
        });
    }
  }
}