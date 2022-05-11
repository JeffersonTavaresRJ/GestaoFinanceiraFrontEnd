import { Component, Injector, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ContaService } from 'src/app/features/cadastros-basicos/_services/conta-service';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-modal-mov-prevista-quitar-form',
  templateUrl: './mov-prevista-quitar-form.component.html',
  styleUrls: ['./mov-prevista-quitar-form.component.css']
})

export class MovPrevistaQuitarFormComponent implements OnInit {

  @Input('modal-mov-prevista-id') idModal: string;
  @Input('modal-mov-prevista') movimentacaoPrevista: MovimentacaoPrevista;

  movRealizadaService: MovRealizadaService;
  formaPagamentoService: FormaPagamentoService;
  contaService: ContaService;
  alertMessageForm: AlertMessageForm;

  idMovRealizadaDelete: number;
  movimentacaoRealizada: MovimentacaoRealizada;

  nrTotal: number;
  nrTotalRecorrencias: number;
  displayError: boolean;
  displayModal: boolean;
  arMovRealizadas: MovimentacaoRealizada[] = [];
  arFormasPagamento: FormaPagamento[] = [];
  arContas: Conta[] = [];
  arStDataMovimentacao: string[]=[];
  arStValor: string[]=[];
  arvalidationErrors: any[] = [];
  clonedMovReal: { [s: string]: MovimentacaoRealizada } = {};

  headerDialog: string;

  constructor(protected injector: Injector) {
    debugger;
    this.movRealizadaService = injector.get(MovRealizadaService);
    this.formaPagamentoService = injector.get(FormaPagamentoService);
    this.contaService = injector.get(ContaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    this.movimentacaoPrevista = changes.movimentacaoPrevista.currentValue;
    if (this.movimentacaoPrevista != null){
        this.headerDialog = "Quitar Previsão: " + this.movimentacaoPrevista.itemMovimentacao.descricao;
        this.carregarTable(); 
        //tratamento para carregar a lista somente com 1 item caso não exista registros..
        if(this.arMovRealizadas.length==0){
          this.movimentacaoRealizada = new MovimentacaoRealizada();
          this.movimentacaoRealizada.itemMovimentacao = this.movimentacaoPrevista.itemMovimentacao;
          this.movimentacaoRealizada.dataReferencia = this.movimentacaoPrevista.dataReferencia;
          this.movimentacaoRealizada.dataMovimentacaoRealizada = new Date();
          this.movimentacaoRealizada.valor = this.movimentacaoPrevista.valor;
          this.arMovRealizadas.push(this.movimentacaoRealizada);
         }
         this.arMovRealizadas.forEach(element => { this.nrTotal += element.valor });     
    }     
  }

  ngOnInit(): void {
    debugger;
    this.formaPagamentoService.getAll().subscribe(result => this.arFormasPagamento = result);
    this.contaService.getAll().subscribe(result => this.arContas = result);
  }

  private carregarTable() {
    debugger;
    this.movRealizadaService.getByDataReferencia
      (this.movimentacaoPrevista.itemMovimentacao.id, 
       DateConvert.formatDateDDMMYYYY(this.movimentacaoPrevista.dataReferencia, '-')).subscribe( 
         success=>{
                   this.arMovRealizadas = success;                   
                  },
        error=>{
          this.actionForError(error)
        });
                                                       
  }

  onRowEditInit(movRealizada: MovimentacaoRealizada) {
    this.clonedMovReal[movRealizada.id] = { ...movRealizada};
    }

  onRowEditSave(movRealizada: MovimentacaoRealizada) {
    this.arFormasPagamento.filter(f => f.id == movRealizada.formaPagamento.id).map(f => {
      movRealizada.formaPagamento.descricao = f.descricao;
    });

    this.arContas.filter(c => c.id == movRealizada.conta.id).map(c => {
      movRealizada.conta.descricao = c.descricao;
    });

    if (movRealizada.valor > 0) {
      delete this.clonedMovReal[movRealizada.id];
    }
    
    this.movRealizadaService.put(
        new FormBuilder().group({
                                  id: [movRealizada.id],
                                  idItemMovimentacao: [movRealizada.itemMovimentacao.id],
                                  dataReferencia:[movRealizada.dataReferencia],
                                  tipoPrioridade:[movRealizada.tipoPrioridade],
                                  observacao:[movRealizada.observacao],
                                  dataMovimentacaoRealizada:[movRealizada.dataMovimentacaoRealizada],
                                  valor:[movRealizada.valor],
                                  idFormaPagamento:[movRealizada.formaPagamento.id],
                                  idConta:[movRealizada.conta.id]})
      ).subscribe(
              sucess=>{this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário')},
              error=>{this.actionForError(error)}
    );
  }

  onRowEditCancel(movRealizada: MovimentacaoRealizada, index: number) {
    this.arMovRealizadas[index] = this.clonedMovReal[movRealizada.id];
    delete this.clonedMovReal[movRealizada.id];
  }

  modalDeleteMessage(movRealizada: MovimentacaoRealizada) {
    this.idMovRealizadaDelete = movRealizada.id;
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovRealizadaDelete)
        .subscribe(sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.carregarTable();
        });
    }
  }

  private actionForError(e) {
    if (e.status == 400) {
      //validações da API (BadRequest) 
      this.arvalidationErrors = e.error;
      this.displayError = true;
    }
  }

  addRow(){
    this.arMovRealizadas.push(this.movimentacaoRealizada);
    this.arMovRealizadas.forEach(element => { this.nrTotal += element.valor });
  }

  clearValidations() {
    this.arvalidationErrors = [];
    this.displayError = false;
  }
}