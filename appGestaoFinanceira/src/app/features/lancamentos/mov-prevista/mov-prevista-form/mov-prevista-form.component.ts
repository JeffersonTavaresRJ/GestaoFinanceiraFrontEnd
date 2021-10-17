import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { ItemMovimentacaoService } from 'src/app/features/cadastros-basicos/_services/item-movimentacao-service';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovPrevistaService } from '../../_services/mov-prevista-service';
import { AlertMessageForm } from '../../../../shared/components/alert-form/alert-message-form';
import { ActivatedRoute, Router } from '@angular/router';
import { enumModel } from 'src/app/shared/_models/generic-enum-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';

@Component({
  selector: 'app-mov-prevista-form',
  templateUrl: './mov-prevista-form.component.html',
  styleUrls: ['./mov-prevista-form.component.css']
})
export class MovPrevistaFormComponent implements OnInit {

  stPageTitle: string;
  arStDate:string[];
  dataIni:Date;
  dataFim:Date;
  formGroup: FormGroup;
  formBuilder: FormBuilder;
  activateRoute: ActivatedRoute;
  router: Router;
  movimentacaoPrevista: MovimentacaoPrevista;
  itemMovimentacao:ItemMovimentacao

  arCategorias: Categoria[];
  arCategoriasAux: Categoria[];
  arItensMovimentacao: ItemMovimentacao[];
  arItensMovimentacaoAux: ItemMovimentacao[];
  arFormasPagamento: FormaPagamento[];
  arTiposPrioridade: enumModel[];
  arTiposRecorrencia: enumModel[];
  arvalidationErrors: any[]=[];

  categoriaService: CategoriaService;
  itemMovimentacaoService: ItemMovimentacaoService;
  formaPagamentoService: FormaPagamentoService;
  movimentacaoPrevistaService: MovPrevistaService;
  alertMessageForm: AlertMessageForm;

  constructor(protected injector: Injector) {
    this.categoriaService = injector.get(CategoriaService);
    this.itemMovimentacaoService = injector.get(ItemMovimentacaoService);
    this.formaPagamentoService = injector.get(FormaPagamentoService);
    this.movimentacaoPrevistaService = injector.get(MovPrevistaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.activateRoute =injector.get(ActivatedRoute);
    this.formBuilder =injector.get(FormBuilder);   
    this.router = injector.get(Router); 
  }



  ngOnInit(): void {

    this.builderForm();
    this.carregarDropDowns();
    this.load();

    this.arStDate = this.activateRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
    this.arStDate = this.activateRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
   
  }  

  parseToNumber(propertyName: string) {
    this.formGroup.get(propertyName).setValue(Number(this.formGroup.get(propertyName).value));
  }

  submmit() {
    debugger;
    this.movimentacaoPrevista= MovimentacaoPrevista.fromJson(this.formGroup.value);
    if(this.currentAction()=="new"){
      this.create(this.movimentacaoPrevista)
    }else if(this.currentAction()=="edit"){
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

  filtrarItemPorCategoria(){
    this.arItensMovimentacao = this.arItensMovimentacaoAux;
    //debugger;

    if(this.formGroup.get('idCategoria').value > 0){
      this.arItensMovimentacao = this.arItensMovimentacao.filter(i=>i.categoria.id==this.formGroup.get('idCategoria').value);
    
      if(this.arItensMovimentacao.length==1){
        this.formGroup.get('idItemMovimentacao').setValue(this.arItensMovimentacao[0].id);
      } 
    }       
  }

  filtrarCategoriaPorItem(){
    this.arCategorias = this.arCategoriasAux;
    this.itemMovimentacao = this.arItensMovimentacao.filter(i=>i.id==this.formGroup.get('idItemMovimentacao').value)[0];
    debugger;

    if(this.formGroup.get('idItemMovimentacao').value > 0){
      this.arCategorias = this.arCategorias.filter(c=>c.id==this.itemMovimentacao.categoria.id);
      this.formGroup.get('idCategoria').setValue(this.arCategorias[0].id);
    }    
  }

  gerarControles(){
        if (this.formGroup.get('tipoRecorrencia').value =="M" || 
            this.formGroup.get('tipoRecorrencia').value =="P"){
          
          this.router.navigate(['/mov-prevista/controles']);
        }
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
      tipoRecorrencia:['N'],
      qtdeParcelas:[1]
    });
  }

  private carregarDropDowns() {
    this.categoriaService.getAll().subscribe(
      (result) => {
        this.arCategorias = result;
        this.arCategorias.filter(c => c.status == true);
        this.arCategoriasAux = this.arCategorias;
      }
    );

    this.itemMovimentacaoService.getAll().subscribe(
      (result) => {
        this.arItensMovimentacao = result;        
        this.arItensMovimentacao.filter(i => i.status == true);
        this.arItensMovimentacaoAux = this.arItensMovimentacao;
      }
    );

    this.formaPagamentoService.getAll().subscribe(
      (result) => {
        this.arFormasPagamento = result;
        this.arFormasPagamento.filter(f => f.status == true);
      }
    );

    this.movimentacaoPrevistaService.GetAllPrioridades().subscribe(
      (result) => {
        this.arTiposPrioridade = result;
      }
    );

    this.movimentacaoPrevistaService.GetAllTiposRecorrencias().subscribe(
      (result) => {
        this.arTiposRecorrencia = result;
      }
    );

  }

  private load() {
    if (this.currentAction() == 'edit') {
      this.activateRoute.data.subscribe(
        (sucess:{resolveMovPrev:MovimentacaoPrevista})=>{
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

  currentAction(): string {
    if (this.activateRoute.snapshot.url[1].path == 'new') {
        this.stPageTitle = "Nova Movimentação Prevista";
        return 'new'
    } else if (this.activateRoute.snapshot.url[1].path == 'edit') {
        this.stPageTitle = "Editar Movimentação Prevista";
        return 'edit';    
    }
}

  private create(movimentacaoPrevista: MovimentacaoPrevista) {
    this.movimentacaoPrevistaService.post(movimentacaoPrevista)
      .subscribe(
        sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
        },
        error => { this.actionForError(error) }
      );
  }

  private update(movimentacaoPrevista: MovimentacaoPrevista) {
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

  
}