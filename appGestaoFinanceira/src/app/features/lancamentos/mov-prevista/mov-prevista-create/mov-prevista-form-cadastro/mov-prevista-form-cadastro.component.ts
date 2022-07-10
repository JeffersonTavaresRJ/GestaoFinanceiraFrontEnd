import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';
import { MovPrevistaService } from '../../../_services/mov-prevista-service';
import { enumModel } from 'src/app/shared/_models/generic-enum-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';


@Component({
  selector: 'app-mov-prevista-form-cadastro',
  templateUrl: './mov-prevista-form-cadastro.component.html',
  styleUrls: ['./mov-prevista-form-cadastro.component.css'],
  providers: [ConfirmationService]
})
export class MovPrevistaFormCadastroComponent extends GenericResourceFormComponent<MovimentacaoPrevista> {

  @Output() gerarRecorrencia = new EventEmitter();

  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  movimentacaoPrevista: MovimentacaoPrevista;
  itemMovimentacao: ItemMovimentacao;
  formaPagamento: FormaPagamento = new FormaPagamento();

  descricaoCategoria: string;
  descricaoItemMovimentacao:string;
  descricaoPrioridade:string;
  descricaoFormaPagamento: string;

  arTiposRecorrencia: enumModel[];
  arMovPrevistas: MovimentacaoPrevista[] = [];

  constructor(protected injector: Injector,
    protected movimentacaoPrevistaService: MovPrevistaService) {
    super(injector, movimentacaoPrevistaService, null);
  }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      idCategoria: [null],
      idItemMovimentacao: [null, Validators.required],
      dataReferencia: [null],
      tipoPrioridade: [null, Validators.required],
      observacao: [null],
      dataVencimento: [null, Validators.required],
      valor: [null, Validators.required],
      status: [null],
      idFormaPagamento: [null, Validators.required],
      tipoRecorrencia: ['N'],
      nrParcela: [1],
      nrParcelaTotal: [1]
    });

    this.movimentacaoPrevistaService.GetAllTiposRecorrencias().subscribe(
      (result) => { this.arTiposRecorrencia = result; });

    this.arStDate = this.actResourceRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.arStDate = this.actResourceRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
  }

  protected resourceCreatePageTitle(): string {
    return 'Nova Movimentação Prevista';
  }

  protected resourceEditPageTitle(): string {
    return 'Editar Movimentação Prevista';
  }

  protected resourceDetalhePageTitle():string{
    return 'Detalhe Movimentação Prevista';
}

  protected loadResource() {
    debugger;
    if (this.resourceCurrentAction() == 'edit' || this.resourceCurrentAction() == 'cons') {
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveMovPrev: MovimentacaoPrevista }) => {
          console.log(sucess);
          debugger;
          //o resolveMovPrev deve ser o mesmo nome na variável resolve da rota.. 
          this.resourceForm.get('idCategoria').setValue(sucess.resolveMovPrev.itemMovimentacao.categoria.id);
          this.resourceForm.get('idItemMovimentacao').setValue(sucess.resolveMovPrev.itemMovimentacao.id);
          this.resourceForm.get('dataReferencia').setValue(new Date(sucess.resolveMovPrev.dataReferencia));
          this.resourceForm.get('tipoPrioridade').setValue(sucess.resolveMovPrev.tipoPrioridade);
          this.resourceForm.get('observacao').setValue(sucess.resolveMovPrev.observacao);
          this.resourceForm.get('dataVencimento').setValue(new Date(sucess.resolveMovPrev.dataVencimento));
          this.resourceForm.get('valor').setValue(sucess.resolveMovPrev.valor);
          this.resourceForm.get('status').setValue(sucess.resolveMovPrev.status);
          this.resourceForm.get('idFormaPagamento').setValue(sucess.resolveMovPrev.formaPagamento.id);

          this.descricaoCategoria = sucess.resolveMovPrev.itemMovimentacao.categoria.descricao;
          this.descricaoItemMovimentacao = sucess.resolveMovPrev.itemMovimentacao.descricao;
          this.descricaoPrioridade = sucess.resolveMovPrev.tipoPrioridadeDescricao;
          this.descricaoFormaPagamento = sucess.resolveMovPrev.formaPagamento.descricao;
        }
      );
    }
  }

  protected resourceCreate() {
    //classe colocada entre colchetes para ser considerada como array de 01 elemento..
    this.movimentacaoPrevistaService.postArray([this.resourceForm])
      .subscribe(
        sucess => {
          this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
        },
        error => { this.resourceActionForError(error) }
      );
  }

  gerarRecorrencias() {
    if (this.resourceForm.get('tipoRecorrencia').value == "M" ||
      this.resourceForm.get('tipoRecorrencia').value == "P") {
      debugger;
      this.movimentacaoPrevista = new MovimentacaoPrevista();
      this.movimentacaoPrevista.itemMovimentacao = this.itemMovimentacao;
      this.movimentacaoPrevista.formaPagamento = this.formaPagamento;
      this.movimentacaoPrevista.tipoPrioridade = this.resourceForm.get('tipoPrioridade').value;
      this.movimentacaoPrevista.observacao = this.resourceForm.get('observacao').value;
      this.movimentacaoPrevista.dataVencimento = this.resourceForm.get('dataVencimento').value;
      this.movimentacaoPrevista.valor = this.resourceForm.get('valor').value;
      this.movimentacaoPrevista.tipoRecorrencia = this.resourceForm.get('tipoRecorrencia').value;
    }
  }


  getCategoria(_ev: Categoria) {
    this.resourceClearValidations();
  }

  getItemMovimentacao(_ev: ItemMovimentacao) {
    this.resourceForm.get('idCategoria').setValue(_ev.categoria.id);
    this.itemMovimentacao = _ev;
    this.resourceClearValidations();
  }

  getFormaPagamento(_ev: FormaPagamento) {
    this.formaPagamento = _ev;
    this.resourceClearValidations();
  }

  clear(_ev) {
    if (_ev) {
      this.resourceClearValidations();
    }
  }
}