import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { FechamentoService } from '../_services/fechamento-service';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaListResolver implements Resolve<any[]> {

  private dataRealizadaIni: string;
  private dataRealizadaFim: string;
  constructor(private movRealizadaService: MovRealizadaService,
              private fechamentoService: FechamentoService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.dataRealizadaIni = activatedRouteSnapshot.params['dataIni'];
    this.dataRealizadaFim = activatedRouteSnapshot.params['dataFim'];
    return this.movRealizadaService.GetGroupBySaldoDiario(this.dataRealizadaIni, this.dataRealizadaFim);
  }
}