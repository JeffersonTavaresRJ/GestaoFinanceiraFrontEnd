import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaConsultaListResolver implements Resolve<MovimentacaoPrevista[]> {

  private dataVencIni: string;
  private dataVencFim: string;
  private idItemMov: number = 0;
  constructor(private movPrevistaService: MovPrevistaService,
    private actResourceRoute: ActivatedRoute) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    if(activatedRouteSnapshot.params['idItemMov']){
      this.idItemMov = activatedRouteSnapshot.params['idItemMov'];
    }
    this.dataVencIni = activatedRouteSnapshot.params['dataVencIni'];
    this.dataVencFim = activatedRouteSnapshot.params['dataVencFim'];
    return this.movPrevistaService.getByDataVencimento(this.idItemMov, this.dataVencIni, this.dataVencFim);
  }

}