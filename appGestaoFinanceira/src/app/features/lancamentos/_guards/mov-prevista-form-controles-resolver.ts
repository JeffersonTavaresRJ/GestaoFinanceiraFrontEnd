import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { FormaPagamento } from '../../cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { FormaPagamentoService } from '../../cadastros-basicos/_services/forma-pagamento-service';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

@Injectable()
export class MovPrevistaFormControlesResolver implements Resolve<any[]> {

  private movimentacaoPrevista: MovimentacaoPrevista;
  private item: number=0;
  
  formaPagamento:FormaPagamento=new FormaPagamento();
  itemMovimentacao:ItemMovimentacao=new ItemMovimentacao();
  arMovimentacoesPrevistas:MovimentacaoPrevista[]=[];  
  
  constructor(private formaPagamentoService: FormaPagamentoService,
              private itemMovimentacaoService: ItemMovimentacaoService,
              private router: Router) {

  }

  resolve() {
    
    debugger;
    const nav = this.router.getCurrentNavigation();
    this.movimentacaoPrevista = nav.extras.state.movPrevista;
    
    if(this.movimentacaoPrevista.tipoRecorrencia=="P"){
      //parcelado..
      total = 1;
    }else{
      //mensal..
      var total = 12 - this.movimentacaoPrevista.dataVencimento.getMonth();
    }
    
    while(this.item <= total){
        this.movimentacaoPrevista.dataVencimento.setMonth(
          this.movimentacaoPrevista.dataVencimento.getMonth()+this.item);

        this.movimentacaoPrevista.formaPagamento = this.formaPagamento;
        this.movimentacaoPrevista.itemMovimentacao = this.itemMovimentacao;

        this.arMovimentacoesPrevistas[this.item] = this.movimentacaoPrevista;            
        this.item++;
      };
    return this.arMovimentacoesPrevistas;
  }

}