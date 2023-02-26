import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../../lancamentos/_services/mov-realizada-service';

@Injectable()
export class MovRealizadaListAnualResolver implements Resolve<any[]> {

  private dataRealizadaIni: string;
  private dataRealizadaFim: string;
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.dataRealizadaIni = activatedRouteSnapshot.params['dataIni'];
    this.dataRealizadaFim = activatedRouteSnapshot.params['dataFim'];
    return this.movRealizadaService.GetByDataMovimentacaoRealizada(this.dataRealizadaIni, this.dataRealizadaFim);
  }
}