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

  results: any[]=[];
  resultsAux: any[]=[];
  arMovReal: any[];
  formGroup: FormGroup;
  formGroupTransfer: FormGroup;

  dataReferencia: Date;
  arStDate: string[];
  toolTip:string=null;
  dataIni: Date;
  dataFim: Date;
  displayDetalhe:boolean;
  displayTransfer: boolean;
  idMovimentacaoRealizada: number;
  movimentacaoRealizadaDetalhe: MovimentacaoRealizada = new MovimentacaoRealizada();
  contaDisplay: Conta;
  saldoAtualConta: number;
  idContaDestino: number;
  idConta: number;
  totalPorFormaPagto: number=0;


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
      idContaDestino: [null,Validators.required],
      dataMovimentacaoRealizada: [null, Validators.required],
      valor:[null,Validators.required]
    })
  }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  filtrarTablePorPeriodo() {
    this.dataFim = new Date(this.dataIni.getFullYear(),
      this.dataIni.getMonth() + 1,
      0);

    this.results.length=0;
    this.resultsAux.length=0;

    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(this.dataIni.toString(), '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim.toString(), '-')).subscribe(
        (sucess: any[]) => {
          //debugger;
          this.results=sucess.slice();
          this.resultsAux=sucess.slice();
          this.filtrarTablePorParametros(this.formGroup.get('idConta').value, this.formGroup.get('idFormaPagamento').value);
        });
  }

  getConta(conta: Conta){
    //alterando a conta anterior que foi utilizada como filtro para deixar de ser o filtro default para pesquisa..
    //debugger;
    if(this.contaDisplay != null){
      
      this.contaDisplay.defaultConta = 'N';

      //id da conta para o novo lançamento..
      this.idConta = conta.id;

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
      this.alertMessageForm.showSuccess(success.message);
          this.filtrarTablePorPeriodo()
    });
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovimentacaoRealizada)
        .subscribe(success => {
          this.alertMessageForm.showSuccess(success.message);
          this.filtrarTablePorPeriodo()
        });
    }
  }

  private filtrarTablePorParametros(idConta?: Number, idFormaPagamento?: Number) {

    //debugger;
    this.results.length=0;
    this.totalPorFormaPagto=0;
    this.toolTip=null;

    if (idConta != null){  

      this.results=this.resultsAux.filter(m => m.conta.id == idConta).slice(); 

      if(this.results.length>0){
        this.saldoAtualConta = this.results[0].valor;
      } 

    }else{
      this.alertMessageForm.showError("A conta deve ser informada");
    }


    if(idFormaPagamento != null){
      this.results = this.results
                         .filter(m => this.filterFormaPagamento(m.movimentacoesRealizadas, idFormaPagamento));

      //totalizando por forma de pagamento..
      this.results.forEach(x=>{
        var total = x.movimentacoesRealizadas.reduce((acum,item)=>{
          return acum + (item.formaPagamento.id!=idFormaPagamento ? 0 : 
                        (item.itemMovimentacao.tipo==="D" ? item.valor *-1 : item.valor))},0);

        this.totalPorFormaPagto+=total;
      });

      this.toolTip = `Total: ${Math.abs(this.totalPorFormaPagto).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}`;

    }
  }

  private filterFormaPagamento(array:any[], id): boolean{
    return array.filter(x=>x.formaPagamento.id==id).length >0;
  }

  private movRealizadaList() {
    this.saldoAtualConta = 0;
    this.arStDate = this.actResourceRoute.snapshot.params.dataIni.split('-');

    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.dataReferencia = this.dataIni;

    this.arStDate = this.actResourceRoute.snapshot.params.dataFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);

    this.results.length=0;
    this.resultsAux.length=0;

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: any[] }) => {
        this.results=sucess.resolveMovReal.slice();
        this.resultsAux=sucess.resolveMovReal.slice();

        //Setando a conta default como parâmetro de pesquisa..
        this.contaService.getAll().subscribe(
          sucess=>{
            this.contaDisplay = sucess.filter(x=>x.defaultConta=="S")[0];
            this.formGroup.get('idConta').setValue(this.contaDisplay.id);
            
            //id da conta para o novo lançamento..
            this.idConta = this.contaDisplay.id;

            this.formGroupTransfer.get('idConta').setValue(this.contaDisplay.id);
            this.filtrarTablePorParametros(this.contaDisplay.id, this.formGroup.get('idFormaPagamento').value);            
          }
        )
        
      }
    );
  }
}