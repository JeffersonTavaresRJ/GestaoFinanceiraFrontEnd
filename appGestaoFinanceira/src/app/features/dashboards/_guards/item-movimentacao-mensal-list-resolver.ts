import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DashboardService } from '../_services/dashboard-service';

@Injectable()
export class ItemMovimentacaoMensalListResolver implements Resolve<any[]> {

  private dataIni: string;
  private dataFim: string;
  constructor(private dashboardService: DashboardService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.dataIni = activatedRouteSnapshot.params['dataIni'];
    this.dataFim = activatedRouteSnapshot.params['dataFim'];
    return this.dashboardService.GetItemMovimentacaoMensal(this.dataIni, this.dataFim);
  }
}