import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

@Injectable()
export class SaldoAnualPeriodoListResolver implements Resolve<any[]> {

  private anoInicial: number;
  private anoFinal: number;
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.anoInicial = Number.parseInt(activatedRouteSnapshot.params['anoInicial']);
    this.anoFinal = Number.parseInt(activatedRouteSnapshot.params['anoFinal']);
    return this.movRealizadaService.GetSaldoAnualPorPeriodo(this.anoInicial, this.anoFinal);
  }
}