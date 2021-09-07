import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaFormResolver implements Resolve<MovimentacaoPrevista> {

  private idItemMovimentacao: number;
  private dataReferencia: string;
  constructor(private movPrevistaService: MovPrevistaService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.idItemMovimentacao = activatedRouteSnapshot.params['idItemMov'];
    this.dataReferencia = activatedRouteSnapshot.params['dataRef'];
    debugger;
    return this.movPrevistaService.getByKey(this.idItemMovimentacao, this.dataReferencia);
  }

}