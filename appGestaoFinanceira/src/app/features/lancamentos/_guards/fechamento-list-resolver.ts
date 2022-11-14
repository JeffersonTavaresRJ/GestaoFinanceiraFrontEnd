import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FechamentoService } from '../_services/fechamento-service';

@Injectable()
export class FechamentoListResolver implements Resolve<any[]> {

  constructor(private fechamentoService: FechamentoService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    return this.fechamentoService.getAll();
  }
}