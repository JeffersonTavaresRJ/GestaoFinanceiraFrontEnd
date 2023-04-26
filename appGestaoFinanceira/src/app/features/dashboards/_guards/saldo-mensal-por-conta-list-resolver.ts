import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DashboardService } from '../_services/dashboard-service';

@Injectable()
export class SaldoMensalPorContaListResolver implements Resolve<any[]> {

  private ano: number;
  constructor(private dashboardService: DashboardService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.ano = Number.parseInt(activatedRouteSnapshot.params['ano']);
    return this.dashboardService.GetSaldoMensalPorConta(this.ano);
  }
}