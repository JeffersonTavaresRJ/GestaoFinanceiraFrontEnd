import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovPrevistaQuitarResolver implements Resolve<MovimentacaoRealizada[]> {  
  
  private idItemMovimentacao: number;
  private dataReferencia: string;
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.idItemMovimentacao = activatedRouteSnapshot.params['idItemMov'];
    this.dataReferencia = activatedRouteSnapshot.params['dataRef'];
    return this.movRealizadaService.getByDataReferencia(this.idItemMovimentacao, this.dataReferencia);
  }

}