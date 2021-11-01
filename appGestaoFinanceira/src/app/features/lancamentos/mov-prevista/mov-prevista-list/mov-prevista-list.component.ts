import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { ItemMovimentacaoService } from 'src/app/features/cadastros-basicos/_services/item-movimentacao-service';
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
  itemMovimentacaoService: ItemMovimentacaoService;
  categoriaService: CategoriaService;
  formaPagamentoService: FormaPagamentoService;
  movPrevistaService: MovPrevistaService;
  alertMessageForm: AlertMessageForm;

  arDtRangeDataVenc: Date[]=new Array();
  arStDate: string[];
  dataIni:Date;
  dataFim:Date;
  idItemMovimentacao:number;
  dataReferencia:Date;


  boLoading: boolean = true;
  
  arEnumPrioridades:enumModel[];
  arEnumStatus:enumModel[];
  arFormasPagamento: FormaPagamento[];
  arItensMovimentacao: ItemMovimentacao[];
  arCategorias: Categoria[];
  arMovPrevistas: MovimentacaoPrevista[];
  
  constructor(protected injector: Injector) { 
    this.actResourceRoute = injector.get(ActivatedRoute);
    this.categoriaService = injector.get(CategoriaService);
    this.itemMovimentacaoService = injector.get(ItemMovimentacaoService);
    this.formaPagamentoService = injector.get(FormaPagamentoService);
    this.movPrevistaService = injector.get(MovPrevistaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
  }

  ngOnInit(): void {
    this.carregaParametros();
    this.movPrevistaList();
  }

  private carregaParametros(){
    //debugger;
    this.arStDate = this.actResourceRoute.snapshot.params.dataVencIni.split('-');
    this.arDtRangeDataVenc[0]=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
    this.arStDate = this.actResourceRoute.snapshot.params.dataVencFim.split('-');
    this.arDtRangeDataVenc[1]=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
  
    this.dataIni = this.arDtRangeDataVenc[0];
    this.dataFim = this.arDtRangeDataVenc[1];
    
    this.formaPagamentoService.getAll().subscribe(
      result=>this.arFormasPagamento = result
    );

    this.itemMovimentacaoService.getAll().subscribe(
      result=>this.arItensMovimentacao = result
    );

    this.movPrevistaService.GetAllStatus().subscribe(
      result=>this.arEnumStatus = result
    );
    
    this.categoriaService.getAll().subscribe(
      result=> this.arCategorias = result
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
        this.boLoading = false;
      }
    );   
  }

  filtrarTablePorPeriodo(){
    //debugger;
    this.dataIni = this.arDtRangeDataVenc[0];
    this.dataFim = this.arDtRangeDataVenc[1];
    this.movPrevistaService.getByDataVencimento(DateConvert.formatDate(this.arDtRangeDataVenc[0]), DateConvert.formatDate(this.arDtRangeDataVenc[1]))
                           .subscribe( result=> this.arMovPrevistas = result);    
    }

    modalDeleteMessage(_idItemMovimentacao: number, _dataReferencia: Date) {
      this.idItemMovimentacao = _idItemMovimentacao;
      this.dataReferencia = _dataReferencia;      
    }
    
    eventDelete(event){
      if(event){
        this.movPrevistaService.delete(this.idItemMovimentacao, DateConvert.formatDate(this.dataReferencia))
            .subscribe(sucess=>{
                                 this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
                                 this.filtrarTablePorPeriodo()
                                });
      }
    }
}