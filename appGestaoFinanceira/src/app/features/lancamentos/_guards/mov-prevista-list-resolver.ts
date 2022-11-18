import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaListResolver implements Resolve<MovimentacaoPrevista[]>  {

  private dataVencIni: string;
  private dataVencFim: string;
  constructor(private movPrevistaService: MovPrevistaService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot):Observable<MovimentacaoPrevista[]> {
    this.dataVencIni = activatedRouteSnapshot.params['dataIni'];
    this.dataVencFim = activatedRouteSnapshot.params['dataFim'];
    return this.movPrevistaService.getByDataVencimento(this.dataVencIni, this.dataVencFim);   
  }
}