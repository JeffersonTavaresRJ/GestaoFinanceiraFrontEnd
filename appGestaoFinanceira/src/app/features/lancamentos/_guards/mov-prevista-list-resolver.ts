import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaListResolver implements Resolve<MovimentacaoPrevista[]> {

  private dataVencIni: string;
  private dataVencFim: string;
  constructor(private movPrevistaService: MovPrevistaService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    this.dataVencIni = activatedRouteSnapshot.params['dataVencIni'];
    this.dataVencFim = activatedRouteSnapshot.params['dataVencFim'];
    return this.movPrevistaService.getByDataVencimento(this.dataVencIni, this.dataVencFim);
  }

}