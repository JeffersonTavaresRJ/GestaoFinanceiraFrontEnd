import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DashboardService } from '../_services/dashboard-service';

@Injectable()
export class SaldoAnualPeriodoListResolver implements Resolve<any[]> {

  private anoInicial: number;
  private anoFinal: number;
  constructor(private dashboardService: DashboardService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.anoInicial = Number.parseInt(activatedRouteSnapshot.params['anoInicial']);
    this.anoFinal = Number.parseInt(activatedRouteSnapshot.params['anoFinal']);
    return this.dashboardService.GetSaldoAnualPorPeriodo(this.anoInicial, this.anoFinal);
  }
}