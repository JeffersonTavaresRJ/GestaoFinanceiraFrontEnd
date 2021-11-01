import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

@Injectable()
export class MovPrevistaFormControlesResolver implements Resolve<MovimentacaoPrevista[]> {

  private movimentacaoPrevista: MovimentacaoPrevista;
  private movPrev: MovimentacaoPrevista;
  private item: number;
  private dataVencimento: Date;
  
  arMovimentacoesPrevistas:any[]=[];  
  
  constructor(private router: Router) {

  }

  resolve() {
    
    //debugger;
    const nav = this.router.getCurrentNavigation();
    this.movimentacaoPrevista = nav.extras.state.movPrevista;
    
    if(this.movimentacaoPrevista.tipoRecorrencia=="P"){
      //parcelado..
      total = 1;
    }else{
      //mensal..
      var total = 12 - this.movimentacaoPrevista.dataVencimento.getMonth();
    }

    this.item=0;
    this.dataVencimento = this.movimentacaoPrevista.dataVencimento;

    while(this.item <= total){        
        this.dataVencimento.setMonth(this.dataVencimento.getMonth()+this.item);
                
        this.movPrev = new MovimentacaoPrevista(); 
        this.movPrev.dataReferencia = new Date(this.dataVencimento.getFullYear(), 
                                               this.dataVencimento.getMonth()+1,
                                               0);
        this.movPrev.dataVencimento = new Date(this.dataVencimento.getFullYear(), 
                                               this.dataVencimento.getMonth(),
                                               this.dataVencimento.getDate());
        this.movPrev.formaPagamento = this.movimentacaoPrevista.formaPagamento;
        this.movPrev.itemMovimentacao = this.movimentacaoPrevista.itemMovimentacao;
        this.movPrev.observacao = this.movimentacaoPrevista.observacao;
        this.movPrev.qtdeParcelas = this.movimentacaoPrevista.qtdeParcelas;
        this.movPrev.status = this.movimentacaoPrevista.status;
        this.movPrev.statusDescricao = this.movimentacaoPrevista.statusDescricao;
        this.movPrev.tipoPrioridade = this.movimentacaoPrevista.tipoPrioridade;
        this.movPrev.tipoPrioridadeDescricao = this.movimentacaoPrevista.tipoPrioridadeDescricao;
        this.movPrev.tipoRecorrencia = this.movimentacaoPrevista.tipoRecorrencia;
        this.movPrev.valor = this.movimentacaoPrevista.valor;
        
        this.arMovimentacoesPrevistas.push(JSON.parse(JSON.stringify(this.movPrev)));

        this.item++;
      };
    return this.arMovimentacoesPrevistas;
  }

}