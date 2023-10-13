import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
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
  formGroupTransfer: FormGroup;

  dataReferencia: Date;
  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  displayDetalhe:boolean;
  displayTransfer: boolean;
  idMovimentacaoRealizada: number;
  movimentacaoRealizadaDetalhe: MovimentacaoRealizada = new MovimentacaoRealizada();
  contaDisplay: Conta;
  saldoAtualConta: number;
  idContaDestino: number;


  constructor(private actResourceRoute: ActivatedRoute,
    private movRealizadaService: MovRealizadaService,
    private contaService : ContaService,
    private alertMessageForm: AlertMessageForm,
    protected formBuilder: FormBuilder) {    
    this.formGroup = this.formBuilder.group({
      idConta: [null],
      idFormaPagamento: [null]
    });

    this.formGroupTransfer = this.formBuilder.group({
      idConta:[null, Validators.required],
      idContaDestino: [null, Validators.required],
      dataMovimentacaoRealizada: [null, Validators.required],
      valor:[null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  filtrarTablePorPeriodo() {
    this.dataFim = new Date(this.dataIni.getFullYear(),
      this.dataIni.getMonth() + 1,
      0);

    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(this.dataIni.toString(), '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim.toString(), '-')).subscribe(
        (sucess: any[]) => {
          debugger;
          this.results = sucess;
          this.resultsAux = this.results;
          this.filtrarTablePorParametros(this.formGroup.get('idConta').value, this.formGroup.get('idFormaPagamento').value);
        });
  }

  getConta(conta: Conta){
    //alterando a conta anterior que foi utilizada como filtro para deixar de ser o filtro default para pesquisa..
    if(this.contaDisplay != null){
      this.contaDisplay.defaultConta = 'N';
      this.contaService.putConta(this.contaDisplay).subscribe(
        sucess=>{
          this.contaDisplay = conta;
          this.formGroupTransfer.get('idConta').setValue(conta.id);
        }
      )
    }
    //alterando a conta atual que está sendo utilizada como filtro para ser o filtro default para pesquisa..
    conta.defaultConta = 'S';
    this.contaService.putConta(conta).subscribe(
      sucess=>{
        this.contaDisplay = conta;
        this.filtrarTablePorParametros(conta.id, this.formGroup.get('idFormaPagamento').value);
      }
    )
  }

  getFormaPagamento(){
    this.filtrarTablePorParametros(this.formGroup.get('idConta').value, this.formGroup.get('idFormaPagamento').value);
  }

  modalDeleteMessage(_idMovimentacaoRealizada: number) {
    this.idMovimentacaoRealizada = _idMovimentacaoRealizada;
  }

  modalDetalhe(movimentacaoRealizada: MovimentacaoRealizada) {
   this.displayDetalhe = true;
   this.movimentacaoRealizadaDetalhe = movimentacaoRealizada;
  }

  Tranferir(){
    var idConta = this.formGroupTransfer.get('idConta').value;
    var idContaDestino = this.formGroupTransfer.get('idContaDestino').value;
    var dataMovimentacaoRealizada = this.formGroupTransfer.get('dataMovimentacaoRealizada').value;
    var valor = this.formGroupTransfer.get('valor').value;

    this.movRealizadaService.Transferir(idConta, idContaDestino, dataMovimentacaoRealizada, valor)
    .subscribe(success=>{
      this.alertMessageForm.showSuccess(success.message, 'Sr. Usuário');
          this.filtrarTablePorPeriodo()
    }, error=>{
      this.alertMessageForm.showError(error.errors, 'Sr. Usuário');
    })
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovimentacaoRealizada)
        .subscribe(success => {
          this.alertMessageForm.showSuccess(success.message, 'Sr. Usuário');
          this.filtrarTablePorPeriodo()
        });
    }
  }

  private filtrarTablePorParametros(idConta?: Number, idFormaPagamento?: Number) {
    this.results = this.resultsAux;
    if (idConta != null){  

      this.results = this.resultsAux.filter(m => m.conta.id == idConta); 

      if(this.results.length>0){
        this.saldoAtualConta = this.results[0].valor;
      } 

    }else{
      this.alertMessageForm.showError("A conta deve ser informada", "Sr. Usuário");
    }

    if(idFormaPagamento != null){
      this.results = this.resultsAux
                         .filter(m => m.movimentacoesRealizadas
                                      .filter(x=>x.formaPagamento.id== idFormaPagamento)
                                      .map((e)=>{return e.idConta}).includes(m.idConta));
    }
  }

  private movRealizadaList() {
    this.saldoAtualConta = 0;
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
            this.contaDisplay = sucess.filter(x=>x.defaultConta=="S")[0];
            this.formGroup.get('idConta').setValue(this.contaDisplay.id);
            this.formGroupTransfer.get('idConta').setValue(this.contaDisplay.id);
            this.filtrarTablePorParametros(this.contaDisplay.id, this.formGroup.get('idFormaPagamento').value);            
          }
        )
        
      }
    );
  }


}