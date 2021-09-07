import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ContaService } from 'src/app/features/cadastros-basicos/_services/conta-service';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-prevista-quitar-form',
  templateUrl: './mov-prevista-quitar-form.component.html',
  styleUrls: ['./mov-prevista-quitar-form.component.css']
})
export class MovPrevistaQuitarFormComponent implements OnInit {
  
  activateRoute: ActivatedRoute;
  movRealizadaService: MovRealizadaService;
  formaPagamentoService: FormaPagamentoService;
  contaService: ContaService;

  dataIni:Date;
  dataFim:Date;
  arStDate:string[]=[];
  arMovRealizadas:MovimentacaoRealizada[]=[];
  arFormasPagamento:FormaPagamento[]=[];
  arContas: Conta[]=[];
  clonedMovReal: { [s: string]: MovimentacaoRealizada; } = {};


  descricaoCategoria: string;
  idItemMovimentacao: number;
  descricaoItemMovimentacao: string;
  dataReferencia: Date;
  descricaoTipoPrioridade: string;
  observacao: string;
  dataVencimento: Date;
  valor: number;
  descricaoStatus: string;
  descricaoFormaPagamento: string;

  movRealizada_id:string;
  movRealizada_dataMovimentacaoRealizada:string;
  
  constructor(protected injector: Injector) {
    this.activateRoute =injector.get(ActivatedRoute);
    this.movRealizadaService = injector.get(MovRealizadaService);
    this.formaPagamentoService = injector.get(FormaPagamentoService);
    this.contaService = injector.get(ContaService);
   }

  ngOnInit(): void {
    this.formaPagamentoService.getAll().subscribe(result=>this.arFormasPagamento = result);
    this.contaService.getAll().subscribe(result=>this.arContas = result);

    this.load();

    this.arStDate = this.activateRoute.snapshot.params.dataVencIni.split('-');
    this.dataIni=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
    this.arStDate = this.activateRoute.snapshot.params.dataVencFim.split('-');
    this.dataFim=new Date(this.arStDate[1]+'-'+this.arStDate[2]+'-'+this.arStDate[0]);
   
  }

  private load() {
      this.activateRoute.data.subscribe(
        (sucess:{resolveMovPrev:MovimentacaoPrevista})=>{
          this.descricaoCategoria=sucess.resolveMovPrev.itemMovimentacao.categoria.descricao;
          this.idItemMovimentacao=sucess.resolveMovPrev.itemMovimentacao.id;
          this.descricaoItemMovimentacao=sucess.resolveMovPrev.itemMovimentacao.descricao;
          this.dataReferencia=new Date(sucess.resolveMovPrev.dataReferencia);
          this.descricaoTipoPrioridade=sucess.resolveMovPrev.tipoPrioridadeDescricao;
          this.observacao=sucess.resolveMovPrev.observacao;
          this.dataVencimento=new Date(sucess.resolveMovPrev.dataVencimento);
          this.valor=sucess.resolveMovPrev.valor;
          this.descricaoStatus=sucess.resolveMovPrev.statusDescricao;
          this.descricaoFormaPagamento=sucess.resolveMovPrev.formaPagamento.descricao;

          this.movRealizadaService.getByDataReferencia(this.idItemMovimentacao,
                                                       DateConvert.formatDate(this.dataReferencia))
                                  .subscribe(result=>this.arMovRealizadas = result);
                
        }
      );
    
  }

onRowEditInit(movRealizada: MovimentacaoRealizada) {
    this.clonedMovReal[movRealizada.id] = {...movRealizada};
}

onRowEditSave(movRealizada: MovimentacaoRealizada) {
    if (movRealizada.valor > 0) {
        delete this.clonedMovReal[movRealizada.id];
    }
}

onRowEditCancel(movRealizada: MovimentacaoRealizada, index: number) {
    this.arMovRealizadas[index] = this.clonedMovReal[movRealizada.id];
    delete this.clonedMovReal[movRealizada.id];
}


}
