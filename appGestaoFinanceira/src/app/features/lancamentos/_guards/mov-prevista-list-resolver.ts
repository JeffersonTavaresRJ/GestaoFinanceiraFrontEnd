import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { FechamentoService } from '../_services/fechamento-service';
import { MovPrevistaService } from '../_services/mov-prevista-service';

@Injectable()
export class MovPrevistaListResolver implements Resolve<MovimentacaoPrevista[]> {

  private dataVencIni: string;
  private dataVencFim: string;
  constructor(private movPrevistaService: MovPrevistaService,
              private fechamentoService: FechamentoService) {

  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    this.dataVencIni = activatedRouteSnapshot.params['dataRealIni'];
    this.dataVencIni = activatedRouteSnapshot.params['dataRealFim'];

    if(this.dataVencIni){
      return this.movPrevistaService.getByDataVencimento(this.dataVencIni, this.dataVencFim);
    }else{
      this.fechamentoService.getAll().subscribe(
        sucess=>{
          debugger;
          this.dataVencIni = DateConvert.formatDateYYYYMMDD(new Date( new Date(sucess[0].dataReferencia).getFullYear(), 
                                                            new Date(sucess[0].dataReferencia).getMonth(),1), '-');
          this.dataVencFim = DateConvert.formatDateYYYYMMDD(new Date(sucess[0].dataReferencia), '-');
          return this.movPrevistaService.getByDataVencimento(this.dataVencIni, this.dataVencFim);
        }
      )}
    }
  }