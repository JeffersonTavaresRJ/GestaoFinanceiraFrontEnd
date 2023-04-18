import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';
import { MovimentacaoRealizadaCommandCreate } from './_commands/mov-realizada/mov-realizada-cmd-create';
import { MovimentacaoRealizadaCommandDelete } from './_commands/mov-realizada/mov-realizada-cmd-delete';
import { MovimentacaoRealizadaCommandUpdate } from './_commands/mov-realizada/mov-realizada-cmd-update';

@Injectable({
  providedIn: 'root'
})
export class MovRealizadaService extends GenericResourceService<MovimentacaoRealizada> {

  constructor(private injector: Injector) { 
    super(injector, 'api/MovimentacaoRealizada',
    MovimentacaoRealizadaCommandCreate.convertFormGroupToCommand,
    MovimentacaoRealizadaCommandUpdate.convertFormGroupToCommand,
    MovimentacaoRealizadaCommandDelete.convertFormGroupToCommand); 
  }

  getByDataReferencia(idItemMovimentacao?: number, dataReferencia?: string): Observable<MovimentacaoRealizada[]> {
    this.setApiOption('/GetByDataReferencia');
    var _idItemMovimentacao = idItemMovimentacao!=null || idItemMovimentacao != undefined ? idItemMovimentacao.toString() : ' ';
    var _dataReferencia = dataReferencia!=null || dataReferencia != undefined ? dataReferencia.toString() : ' ';
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${_idItemMovimentacao}/${_dataReferencia}`);
  }

  GetByDataMovimentacaoRealizada(dataMovRealIni: string, dataMovRealFim: string): Observable<any[]> {
    this.setApiOption('/GetByDataMovimentacaoRealizada'); 
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${dataMovRealIni}/${dataMovRealFim}`);
  }

  GetGroupBySaldoDiario(dataMovRealIni: string, dataMovRealFim: string): Observable<any[]> {
    this.setApiOption('/GetGroupBySaldoDiario'); 
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${dataMovRealIni}/${dataMovRealFim}`);
  }

  GetMaxGroupBySaldoConta(dataReferencia: string=null): Observable<any[]> {
    this.setApiOption('/GetMaxGroupBySaldoConta'); 
    var _dataReferencia = dataReferencia!=null || dataReferencia != undefined ? dataReferencia.toString() : ' ';
    return this.http.get<any[]>(`${this.getUrl()}/${_dataReferencia}`);
  }

  GetSaldoAnualPorConta(ano: number): Observable<any[]> {
    this.setApiOption('/GetSaldoAnualPorConta'); 
    return this.http.get<any[]>(`${this.getUrl()}/${ano}`);
  }

  GetSaldoAnualPorPeriodo(anoInicial: number, anoFinal: number): Observable<any[]> {
    this.setApiOption('/GetSaldoAnualPorPeriodo'); 
    return this.http.get<any[]>(`${this.getUrl()}/${anoInicial}/${anoFinal}`);
  }
}