import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaListResolver implements Resolve<any[]> {

  private dataRealizadaIni: string;
  private dataRealizadaFim: string;
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.dataRealizadaIni = activatedRouteSnapshot.params['dataRealIni'];
    this.dataRealizadaFim = activatedRouteSnapshot.params['dataRealFim'];
    debugger;
    return this.movRealizadaService.GetGroupBySaldoDiario(this.dataRealizadaIni, this.dataRealizadaFim);
  }
}