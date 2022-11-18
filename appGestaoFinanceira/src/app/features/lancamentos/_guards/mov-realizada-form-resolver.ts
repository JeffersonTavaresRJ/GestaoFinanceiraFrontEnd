import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaFormResolver implements Resolve<MovimentacaoRealizada> {

  private idMovReal: number;
  constructor(private movRealizadaService: MovRealizadaService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    //colocar GetId na api com leitura de id da mov realizada,..
    this.idMovReal = activatedRouteSnapshot.params['idMovReal'];
    return this.movRealizadaService.getById(this.idMovReal);
  }

}