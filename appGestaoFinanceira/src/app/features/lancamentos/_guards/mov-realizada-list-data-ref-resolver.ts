import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaListDataRefResolver implements Resolve<any[]> {

  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    return this.movRealizadaService.getByDataReferencia();
  }
}