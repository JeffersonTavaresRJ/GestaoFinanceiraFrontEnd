import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { FechamentoService } from '../_services/fechamento-service';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaListResolver implements Resolve<any[]> {

  private dataRealizadaIni: string;
  private dataRealizadaFim: string;
  constructor(private movRealizadaService: MovRealizadaService,
              private fechamentoService: FechamentoService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    this.dataRealizadaIni = activatedRouteSnapshot.params['dataRealIni'];
    this.dataRealizadaFim = activatedRouteSnapshot.params['dataRealFim'];

    if(this.dataRealizadaIni){
      return this.movRealizadaService.GetGroupBySaldoDiario(this.dataRealizadaIni, this.dataRealizadaFim);
    }else{
      this.fechamentoService.getAll().subscribe(
        sucess=>{
          debugger;
          this.dataRealizadaIni = DateConvert.formatDateYYYYMMDD(new Date( new Date(sucess[0].dataReferencia).getFullYear(), 
                                                                 new Date(sucess[0].dataReferencia).getMonth(),1), '-');
          this.dataRealizadaFim = DateConvert.formatDateYYYYMMDD(new Date(sucess[0].dataReferencia), '-');
          return this.movRealizadaService.GetGroupBySaldoDiario(this.dataRealizadaIni, this.dataRealizadaFim);
        })
    }
  }   
}