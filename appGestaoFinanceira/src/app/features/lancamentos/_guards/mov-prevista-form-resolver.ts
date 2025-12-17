import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaFormResolver implements Resolve<MovimentacaoPrevista> {

  private id: number;
  constructor(private movPrevistaService: MovPrevistaService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    this.id = activatedRouteSnapshot.params['id'];
    return this.movPrevistaService.getById(this.id);
  }

}