import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

@Injectable()
export class SaldoAnualPorContaListResolver implements Resolve<any[]> {

  private ano: number;
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.ano = Number.parseInt(activatedRouteSnapshot.params['ano']);
    return this.movRealizadaService.GetSaldoAnualPorConta(this.ano);
  }
}