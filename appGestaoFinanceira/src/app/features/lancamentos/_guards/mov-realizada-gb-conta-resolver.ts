import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaGroupByContaResolver implements Resolve<any[]> {

  private dataReferencia: string;
  constructor( private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    this.dataReferencia = activatedRouteSnapshot.params['dataFim'];
    return this.movRealizadaService.GetMaxGroupBySaldoConta(this.dataReferencia);
  }
}