import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaDetalhadaListResolver implements Resolve<any[]> {
  
  constructor(private movRealizadaService: MovRealizadaService) {}

  resolve(){
    return this.movRealizadaService.getByDataReferencia();
  }
}