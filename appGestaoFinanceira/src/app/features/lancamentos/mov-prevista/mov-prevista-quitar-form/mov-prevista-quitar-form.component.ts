import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-modal-mov-prevista-quitar-form',
  templateUrl: './mov-prevista-quitar-form.component.html',
  styleUrls: ['./mov-prevista-quitar-form.component.css'],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})

export class MovPrevistaQuitarFormComponent implements OnInit {

  movRealizadaService: MovRealizadaService;
  alertMessageForm: AlertMessageForm;
  actResourceRoute: ActivatedRoute;

  movimentacaoRealizada: MovimentacaoRealizada;
  movimentacaoPrevista: MovimentacaoPrevista;

  dataVencIni: string;
  dataVencFim: string;
  deleteMessage: string;

  valorTotalPago: number = 0;
  idMovRealizadaDelete: number;
  idxDelete: number;

  displayDialogErrors: boolean;

  arvalidationErrors: any[] = [];
  arForms: FormArray = this.fb.array([]);
  arFormGroup: FormGroup[] = [];
  arContas: Conta[]=[];
  arFormasPagamento: FormaPagamento[]=[];

  constructor(protected injector: Injector,
    private fb: FormBuilder) {
    this.movRealizadaService = injector.get(MovRealizadaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.actResourceRoute = injector.get(ActivatedRoute);
  }


  ngOnInit(): void {
    this.dataVencIni = this.actResourceRoute.snapshot.params.dataVencIni;
    this.dataVencFim = this.actResourceRoute.snapshot.params.dataVencFim;

    //leitura do resolver do dropdow Contas..
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arContas = sucess.resolveConta.filter(c=>c.status==true);        
      }
    );

    //leitura do resolver do dropdow Formas de Pagamento..
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveFormPag: FormaPagamento[] }) => {
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arFormasPagamento = sucess.resolveFormPag.filter(c=>c.status==true);         
      }
    );

    //leitura do resolver da Movimentação Prevista..
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovPrev: MovimentacaoPrevista }) => {
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.movimentacaoPrevista = sucess.resolveMovPrev;
        //tratamento para conversão de string para date..
        this.movimentacaoPrevista.dataVencimento = new Date(sucess.resolveMovPrev.dataVencimento);
      }
    );

    //leitura do resolver das Movimentações Realizadas..
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
        //o resolveResources deve ser o mesmo nome na variável resolve da rota..
        if (sucess.resolveMovReal.length == 0) {
          this.addArForms(
            this.movimentacaoPrevista.itemMovimentacao.id,
            this.movimentacaoPrevista.tipoPrioridade,
            this.movimentacaoPrevista.observacao,
            0, this.movimentacaoPrevista.dataVencimento, null, null, this.movimentacaoPrevista.valor, true);
        } else {
          sucess.resolveMovReal.forEach((element: MovimentacaoRealizada) => {
            this.addArForms(
              this.movimentacaoPrevista.itemMovimentacao.id,
              this.movimentacaoPrevista.tipoPrioridade,
              this.movimentacaoPrevista.observacao,
              element.id,
              element.dataMovimentacaoRealizada,
              element.conta.id,
              element.formaPagamento.id,
              element.valor,
              false,
              element.conta.descricao,
              element.formaPagamento.descricao);
            this.valorTotalPago += element.valor
          })
        }
      }
    );
  }

  modalDeleteMessage(id: number, dataMovimentacaoRealizada: Date, i:number) {
    var stDataMovRealizada = DateConvert.formatDateDDMMYYYY(dataMovimentacaoRealizada, '/');
    this.idxDelete = i;
    this.idMovRealizadaDelete = id;
    this.deleteMessage = `${'Confirma a exclusão do lançamento referente ao dia '}${stDataMovRealizada.bold()}${'?'}`;;
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovRealizadaDelete).subscribe(
        sucess => {
          this.arForms.removeAt(this.idxDelete);
          this.totalizarValorPago();
          this.alertMessageForm.showSuccess(sucess.message);
        }/*,
        error => {
          this.actionForError(error)
        }*/);
    }
  }

  addRow() {
    debugger;
    //incrementando a data da movimentação realizada..
    var dataMovimentacaoRealizada = this.movimentacaoPrevista.dataVencimento;

    this.arForms.controls.forEach(element => {
      var dataArray = element.get('dataMovimentacaoRealizada').value;
      if (dataArray > dataMovimentacaoRealizada) {
        dataMovimentacaoRealizada = dataArray;
      }
    });

    if (this.arForms.length > 0) {
      dataMovimentacaoRealizada = new Date(dataMovimentacaoRealizada.getFullYear(),
        dataMovimentacaoRealizada.getMonth(),
        dataMovimentacaoRealizada.getDate() + 1)
    }

    //adicionando o novo form no array..
    if (this.arForms.length < 10) {
      this.addArForms(
        this.movimentacaoPrevista.itemMovimentacao.id,
        this.movimentacaoPrevista.tipoPrioridade,
        this.movimentacaoPrevista.observacao,
        0, dataMovimentacaoRealizada, null, null, this.movimentacaoPrevista.valor, true);
    } else {
      this.alertMessageForm.showError("O limite máximo são 10 registros.");
    }
  }

  editRow(i: number) {
    this.arForms.controls[i].get('isEdit').setValue(true);
  }

  cancelRow(i:number){
    this.arForms.controls[i].get('isEdit').setValue(false);
  }

  deleteRow(i: number) {
    this.arForms.removeAt(i);
  }

  salvar(fGroup: FormGroup, i: number) {
    debugger;
    //tratamento para converter string em Date..
    var dataMovReal = DateConvert.stringToDate(fGroup.get('dataMovimentacaoRealizada').value, "-");
    fGroup.get('dataMovimentacaoRealizada').setValue(dataMovReal);
    
    if (fGroup.get('isEdit').value == true) {

      if (fGroup.get('id').value == 0) {

        this.movRealizadaService.post(fGroup).subscribe(
          sucess => {
            fGroup.get('id').setValue( Number.parseFloat(sucess.id));
            fGroup.get('isEdit').setValue(false);
            this.totalizarValorPago();
            this.alertMessageForm.showSuccess(sucess.message);            
          }/*,
          error => {
            this.actionForError(error)
          }*/);

      } else {
        this.movRealizadaService.put(fGroup).subscribe(
          sucess => {
            fGroup.get('isEdit').setValue(false);
            this.totalizarValorPago();
            this.alertMessageForm.showSuccess(sucess.message);            
          }/*,
          error => {
            this.actionForError(error)
          }*/);
      }
    }
  }

  clearValidations() {
    this.arvalidationErrors = [];
    this.displayDialogErrors = false;
  }

  getConta(fGroup: FormGroup, i:number){
    var descricao = this.arContas.filter(c=>c.id==fGroup.get('idConta').value).map(function(item, idx){
      return item.descricao
    });
    this.arForms.controls[i].get('descricaoConta').setValue(descricao[0]);
  }

  getFormaPagamento(fGroup: FormGroup, i: number){
    var descricao = this.arFormasPagamento.filter(c=>c.id==fGroup.get('idFormaPagamento').value).map(function(item, idx){
      return item.descricao
    });
    this.arForms.controls[i].get('descricaoFormaPagamento').setValue(descricao[0]);  
  }

  private addArForms(_idItemMovimentacao: number,
    _tipoPrioridade: string,
    _observacao: string,
    _id: number,
    _dataMovimentacao: Date,
    _idConta: number,
    _idFormaPagamento: number,
    _valor: number,
    _isEdit?: boolean,
    _descricaoConta?: string,
    _descricaoFormaPagamento?: string
  ) {
    this.arForms.push(this.fb.group({
      idItemMovimentacao: [_idItemMovimentacao],
      tipoPrioridade: [_tipoPrioridade],
      observacao: [_observacao],
      id: [_id],
      dataMovimentacaoRealizada: [new Date(_dataMovimentacao), Validators.required],
      idConta: [_idConta, Validators.required],
      descricaoConta: [_descricaoConta],
      idFormaPagamento: [_idFormaPagamento, Validators.required],
      descricaoFormaPagamento: [_descricaoFormaPagamento],
      valor: [_valor, Validators.required],
      isEdit: [_isEdit]
    }));
  }

  private totalizarValorPago() {
    this.valorTotalPago = 0;
    this.arForms.controls.forEach(element => {
      if (element.get('isEdit').value == false) {
        this.valorTotalPago += element.get('valor').value;
      }
    });
  }

  /*
  private actionForError(e) {
    if (e.status == 400) {
      //validações da API (BadRequest) 
      this.arvalidationErrors = e.error;
      this.displayDialogErrors = true;
    }
  }
  */

}