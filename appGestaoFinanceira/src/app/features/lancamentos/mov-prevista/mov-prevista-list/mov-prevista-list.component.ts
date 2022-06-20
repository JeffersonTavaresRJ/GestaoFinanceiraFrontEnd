import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { enumModel } from 'src/app/shared/_models/generic-enum-model';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovPrevistaService } from '../../_services/mov-prevista-service';

@Component({
  selector: 'app-mov-prevista-list',
  templateUrl: './mov-prevista-list.component.html',
  styleUrls: ['./mov-prevista-list.component.css']
})
export class MovPrevistaListComponent implements OnInit {

  actResourceRoute: ActivatedRoute;
  movPrevistaService: MovPrevistaService;
  alertMessageForm: AlertMessageForm;
  formGroup: FormGroup;
  formBuilder: FormBuilder;

  categoria: Categoria;
  itemMovimentacao: ItemMovimentacao;
  formaPagamento: FormaPagamento;
  prioridade: any;

  arStDate: string[];
  dataIni:Date;
  dataFim:Date;
  idItemMovimentacao:number;
  valorTotalReceita: number=0;
  valorTotalDespesa: number=0;
  dataReferencia:Date;
  status:string;

  arEnumPrioridades:enumModel[];
  arEnumStatus:enumModel[];
  arMovPrevistas: MovimentacaoPrevista[];
  arMovPrevistasAux: MovimentacaoPrevista[];
  movimentacaoPrevista: MovimentacaoPrevista = new MovimentacaoPrevista();
  
  constructor(protected injector: Injector) { 
    this.actResourceRoute = injector.get(ActivatedRoute);
    this.movPrevistaService = injector.get(MovPrevistaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.carregaParametros();
    this.movPrevistaList();
    this.builderForm();
  }

  getCategoria(categoria: Categoria){
    this.categoria = categoria;
    this.filtrarTablePorParametros(this.categoria, this.itemMovimentacao, this.formaPagamento, this.prioridade);
  }

  getItemMovimentacao(itemMovimentacao: ItemMovimentacao){
    this.itemMovimentacao = itemMovimentacao;
    this.filtrarTablePorParametros(this.categoria, this.itemMovimentacao, this.formaPagamento, this.prioridade);
  }

  getFormaPagamento(formaPagamento: FormaPagamento){
    this.formaPagamento = formaPagamento;
    this.filtrarTablePorParametros(this.categoria, this.itemMovimentacao, this.formaPagamento, this.prioridade);
  }

  getPrioridade(prioridade: any){
    this.prioridade = prioridade;
    this.filtrarTablePorParametros(this.categoria, this.itemMovimentacao, this.formaPagamento, this.prioridade);
  }

  onChangeStatus(){
    this.filtrarTablePorParametros(this.categoria, this.itemMovimentacao, this.formaPagamento, this.prioridade);
  }

  filtrarTablePorPeriodo(){
    debugger;
    this.dataFim = new Date(this.dataFim.getFullYear(), 
                            this.dataFim.getMonth()+1,
                            0);
    this.movPrevistaService.getByDataVencimento(DateConvert.formatDateYYYYMMDD(this.dataIni, '-'), 
                                                DateConvert.formatDateYYYYMMDD(this.dataFim, '-'))
                           .subscribe( result=> {
                            this.arMovPrevistas = result;
                            this.arMovPrevistasAux = result;
                            this.calcularSaldo();
                          });    
    }

  modalDeleteMessage(_idItemMovimentacao: number, _dataReferencia: Date) {
      this.idItemMovimentacao = _idItemMovimentacao;
      this.dataReferencia = _dataReferencia;      
  }

  modalQuitacao(movimentacaoPrevista: MovimentacaoPrevista) {
      debugger;
      this.movimentacaoPrevista = movimentacaoPrevista;
  }
    
  eventDelete(event){
      if(event){
        this.movPrevistaService.delete(this.idItemMovimentacao, DateConvert.formatDateYYYYMMDD(this.dataReferencia, '-'))
            .subscribe(sucess=>{
                                 this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
                                 this.filtrarTablePorPeriodo()
                                });
      }
  }

  private builderForm(){
      this.formGroup = this.formBuilder.group({
        idCategoria:[null],
        idItemMovimentacao:[null],
        idFormaPagamento:[null],
        idPrioridade:[null]
      });
  }

  private filtrarTablePorParametros(categoria: Categoria,
                            itemMovimentacao: ItemMovimentacao,
                            formaPagamento: FormaPagamento,
                            prioridade: any){

        this.arMovPrevistas = this.arMovPrevistasAux;

        if(categoria != null){
          this.arMovPrevistas = this.arMovPrevistasAux.filter(m=>m.itemMovimentacao.categoria.id==categoria.id);
        }

        if(itemMovimentacao != null){
          this.arMovPrevistas = this.arMovPrevistasAux.filter(m=>m.itemMovimentacao.id==itemMovimentacao.id);
        }

        if(formaPagamento != null){
          this.arMovPrevistas = this.arMovPrevistasAux.filter(m=>m.formaPagamento.id==formaPagamento.id);
        }

        if(prioridade != null){
          this.arMovPrevistas = this.arMovPrevistasAux.filter(m=>m.tipoPrioridade==prioridade.value);
        }

        if(this.status != null){
          this.arMovPrevistas = this.arMovPrevistasAux.filter(m=>m.status_==this.status);
        }

        this.calcularSaldo();
  }

  private calcularSaldo() {
    this.valorTotalDespesa = 0;
    this.valorTotalReceita = 0;
    this.arMovPrevistas.forEach((element: MovimentacaoPrevista) => {
      if (element.itemMovimentacao.tipo == "D") {
        this.valorTotalDespesa += element.valor;
      } else {
        this.valorTotalReceita += element.valor;
      }
    });

    //ordenação por YYYYMM numérico..
   // this.arMovPrevistas.sort(function(a,b){return (((b.dataVencimento.getFullYear()*100)+b.dataVencimento.getMonth())-
     //     ((a.dataVencimento.getFullYear()*100)+a.dataVencimento.getMonth()));
   // });
  }

  private carregaParametros(){
    debugger;
    this.arStDate = this.actResourceRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
    this.arStDate = this.actResourceRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);

    this.movPrevistaService.GetAllStatus().subscribe(
      result=>this.arEnumStatus = result
    );  

    this.movPrevistaService.GetAllPrioridades().subscribe(
      (result) => {
        this.arEnumPrioridades = result;
      }
    );
  }

  private movPrevistaList(){
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveResources:MovimentacaoPrevista[]})=>{
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovPrevistas=sucess.resolveResources;
        this.arMovPrevistasAux = sucess.resolveResources;
        this.calcularSaldo();
      }
    );   
  }  
}