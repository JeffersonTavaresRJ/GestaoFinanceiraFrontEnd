import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

@Injectable()
export class MovPrevistaFormControlesResolver implements Resolve<MovimentacaoPrevista[]> {

  private movimentacaoPrevista: MovimentacaoPrevista;
  dataIni: string;
  dataFim: string; 

  constructor(private router: Router) {}

  resolve() {
    
    //debugger;
    const nav = this.router.getCurrentNavigation();
    this.movimentacaoPrevista = nav.extras.state.movPrevista;

    if(this.movimentacaoPrevista.tipoRecorrencia=="P"){
      //parcelado..
      total = 1;
    }else{
      //mensal..
      var total = 12 - (this.movimentacaoPrevista.dataVencimento.getMonth()+1);
    }
    return MovimentacaoPrevista.gerarRecorrencias(this.movimentacaoPrevista, total);
  }
}