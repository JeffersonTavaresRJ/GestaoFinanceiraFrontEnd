import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';
import { MovPrevistaService } from '../../../_services/mov-prevista-service';
import { AlertMessageForm } from '../../../../../shared/components/alert-form/alert-message-form';
import { ActivatedRoute, Router } from '@angular/router';
import { enumModel } from 'src/app/shared/_models/generic-enum-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';


@Component({
  selector: 'app-mov-prevista-form-cadastro',
  templateUrl: './mov-prevista-form-cadastro.component.html',
  styleUrls: ['./mov-prevista-form-cadastro.component.css'],
  providers: [ConfirmationService]
})
export class MovPrevistaFormCadastroComponent implements OnInit {

  @Output() gerarRecorrencia = new EventEmitter();

  stPageTitle: string;
  nrTotal:number;
  optionValueIdCategoria:number;
  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  formGroup: FormGroup;
  formBuilder: FormBuilder;
  activateRoute: ActivatedRoute;
  router: Router;
  movimentacaoPrevista: MovimentacaoPrevista;
  itemMovimentacao: ItemMovimentacao;
  arMovPrevistas: MovimentacaoPrevista[]=[];
  formaPagamento: FormaPagamento = new FormaPagamento();

  arTiposRecorrencia: enumModel[];
  arvalidationErrors: any[] = [];

  movimentacaoPrevistaService: MovPrevistaService;

  alertMessageForm: AlertMessageForm;

  constructor(protected injector: Injector) {
    this.movimentacaoPrevistaService = injector.get(MovPrevistaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.activateRoute = injector.get(ActivatedRoute);
    this.formBuilder = injector.get(FormBuilder);
    this.router = injector.get(Router);
  }

  ngOnInit(): void {

    this.builderForm();

    this.movimentacaoPrevistaService.GetAllTiposRecorrencias().subscribe(
      (result) => {this.arTiposRecorrencia = result;});

    this.load();

    this.arStDate = this.activateRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.arStDate = this.activateRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);

  }

  private builderForm() {
    this.formGroup = this.formBuilder.group({
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
      qtdeParcelas: [1]
    });
  }

  currentAction(): string {
    if (this.activateRoute.snapshot.url[1].path == 'new') {
      this.stPageTitle = "Nova Movimentação Prevista";
      return 'new'
    } else if (this.activateRoute.snapshot.url[1].path == 'edit') {
      this.stPageTitle = "Editar Movimentação Prevista";
      return 'edit';
    }
  }  

  private load() {
    if (this.currentAction() == 'edit') {
      this.activateRoute.data.subscribe(
        (sucess: { resolveMovPrev: MovimentacaoPrevista }) => {
          console.log(sucess);
          //o resolveMovPrev deve ser o mesmo nome na variável resolve da rota.. 
          this.formGroup.get('idCategoria').setValue(sucess.resolveMovPrev.itemMovimentacao.categoria.id);
          this.formGroup.get('idItemMovimentacao').setValue(sucess.resolveMovPrev.itemMovimentacao.id);
          this.formGroup.get('dataReferencia').setValue(new Date(sucess.resolveMovPrev.dataReferencia));
          this.formGroup.get('tipoPrioridade').setValue(sucess.resolveMovPrev.tipoPrioridade);
          this.formGroup.get('observacao').setValue(sucess.resolveMovPrev.observacao);
          this.formGroup.get('dataVencimento').setValue(new Date(sucess.resolveMovPrev.dataVencimento));
          this.formGroup.get('valor').setValue(sucess.resolveMovPrev.valor);
          this.formGroup.get('status').setValue(sucess.resolveMovPrev.status);
          this.formGroup.get('idFormaPagamento').setValue(sucess.resolveMovPrev.formaPagamento.id);
        }
      );
    }
  }

 getCategoria(_ev: Categoria){
    this.clearValidations();
 }

 getItemMovimentacao(_ev: ItemMovimentacao){
   this.formGroup.get('idCategoria').setValue(_ev.categoria.id);
   this.itemMovimentacao = _ev;
   this.clearValidations();
 }

 getFormaPagamento(_ev: FormaPagamento){
   this.formaPagamento = _ev;
   this.clearValidations();
 }

 clear(_ev){
   if(_ev){
    this.clearValidations();
   }
 }

submmit() {
    debugger;
    this.movimentacaoPrevista = MovimentacaoPrevista.formGroupToJson(this.formGroup);

    if (this.currentAction() == "new") {
      this.create(this.movimentacaoPrevista)
    } else if (this.currentAction() == "edit") {
      this.update(this.movimentacaoPrevista)
    }
  }

  clearValidations() {
    this.arvalidationErrors = [];
  }

  errorsValidations(param: string): any[] {
    if (this.formGroup.valid && this.arvalidationErrors.length > 0) {
      debugger;
      return this.arvalidationErrors.filter(i => i.propertyName.toLowerCase() == param.toLowerCase());
    }
  } 


  private create(movimentacaoPrevista: MovimentacaoPrevista) {
    //classe colocada entre colchetes para ser considerada como array de 01 elemento..
    this.movimentacaoPrevistaService.postArray( [movimentacaoPrevista] )
      .subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
        },
        error => { this.actionForError(error) }
      );
  }

  private update(movimentacaoPrevista: MovimentacaoPrevista) {
    debugger;
    this.movimentacaoPrevistaService.put(movimentacaoPrevista)
      .subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
        },
        error => { this.actionForError(error) }
      );
  }

  private actionForError(e) {
    console.log(e.error);
    if (e.status == 400) {
      //validações da API (BadRequest) 
      this.arvalidationErrors = e.error;
    }
  }

  gerarRecorrencias() {
    if (this.formGroup.get('tipoRecorrencia').value == "M" ||
      this.formGroup.get('tipoRecorrencia').value == "P") {
      //debugger;

      this.movimentacaoPrevista = new MovimentacaoPrevista();
      this.movimentacaoPrevista.itemMovimentacao = this.itemMovimentacao;
      this.movimentacaoPrevista.formaPagamento = this.formaPagamento;
      this.movimentacaoPrevista.tipoPrioridade = this.formGroup.get('tipoPrioridade').value;
      this.movimentacaoPrevista.observacao = this.formGroup.get('observacao').value;
      this.movimentacaoPrevista.dataVencimento = this.formGroup.get('dataVencimento').value;
      this.movimentacaoPrevista.valor = this.formGroup.get('valor').value;
      this.movimentacaoPrevista.tipoRecorrencia = this.formGroup.get('tipoRecorrencia').value;     
    }
  }   
}