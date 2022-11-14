import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { FechamentoService } from '../_services/fechamento-service';
import { MovRealizadaService } from '../_services/mov-realizada-service';

@Injectable()
export class MovRealizadaGroupByContaResolver implements Resolve<any[]> {

  private dataReferencia: string;
  constructor( private movRealizadaService: MovRealizadaService,
               private fechamentoService: FechamentoService) {}

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    debugger;
    this.dataReferencia = activatedRouteSnapshot.params['dataFim'];

    if(this.dataReferencia){
      return this.movRealizadaService.GetMaxGroupBySaldoConta(this.dataReferencia);
    }else{
      this.fechamentoService.getAll().subscribe(
        sucess=>{
          debugger;
          this.dataReferencia = DateConvert.formatDateYYYYMMDD(new Date(sucess[0].dataReferencia), '-');
          return this.movRealizadaService.GetMaxGroupBySaldoConta(this.dataReferencia);
        })
    }   
  }
}