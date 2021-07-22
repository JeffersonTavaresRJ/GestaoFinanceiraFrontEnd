import { Injectable, Injector } from '@angular/core';
import { Resolve } from '@angular/router';
import{MovimentacaoPrevista } from '../_models/mov-prevista-model';
import{MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaConsultaListResolver
    implements Resolve<MovimentacaoPrevista[]> {
   
    constructor(private movPrevistaService: MovPrevistaService) {
    }

   resolve() {
    debugger;
     const dataAtual = new Date();
     var mes = dataAtual.getMonth();
     var ano = dataAtual.getFullYear();
     return this.movPrevistaService.getByDataVencimento(null, new Date(ano, mes, 1), new Date(ano, mes+1, 0));
   }
   
}