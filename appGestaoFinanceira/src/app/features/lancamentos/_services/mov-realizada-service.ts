import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';
import { MovimentacaoRealizadaCommandCreate } from './_commands/mov-realizada/mov-realizada-cmd-create';
import { MovimentacaoRealizadaCommandDelete } from './_commands/mov-realizada/mov-realizada-cmd-delete';
import { MovimentacaoRealizadaCommandUpdate } from './_commands/mov-realizada/mov-realizada-cmd-update';
import { MovimentacaoRealizadaCommandQuitarMovPrev } from './_commands/mov-realizada/mov-realizada-cmd-quitar-mov-prev';
import { FormGroup } from '@angular/forms';
import { GenericCommand } from 'src/app/shared/_services/commands/generic-cmd';

@Injectable({
  providedIn: 'root'
})
export class MovRealizadaService extends GenericResourceService<MovimentacaoRealizada> {

  date: Date;

  constructor(private injector: Injector) { 
    super(injector, 'api/MovimentacaoRealizada',
    MovimentacaoRealizadaCommandCreate.convertFormGroupToCommand,
    MovimentacaoRealizadaCommandUpdate.convertFormGroupToCommand,
    MovimentacaoRealizadaCommandDelete.convertFormGroupToCommand); 
  }

  Transferir(idConta: number, idContaDestino: number, dataMovimentacaoRealizada: string, valor: number): Observable<any>{
    this.setApiOption('/TransferenciaContas');
    //debugger;
    var param = {
        idConta: idConta,
        idContaDestino: idContaDestino,
        dataMovimentacaoRealizada: dataMovimentacaoRealizada,
        valor: valor
      }
      return this.http.post(this.getUrl(), param);
  }

  quitarMovimentacaoPrevista(fGroup: FormGroup): Observable<any>{
    //debugger;
    var command = MovimentacaoRealizadaCommandQuitarMovPrev.convertFormGroupToCommand(fGroup);
      if(command.id > 0){
        return this.http.put(this.getUrl(), command);
      }else{
        return this.http.post(this.getUrl(), command);
      }      
  }

  getByDataReferencia(dataReferencia: string, idItemMovimentacao?: number): Observable<MovimentacaoRealizada[]> {
    this.setApiOption('/GetByDataReferencia');
    var _idItemMovimentacao = idItemMovimentacao!=null || idItemMovimentacao != undefined ? idItemMovimentacao.toString() : ' ';
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${dataReferencia}/${_idItemMovimentacao}`);
  }

  GetByDataMovimentacaoRealizada(dataMovRealIni: string, dataMovRealFim: string): Observable<any[]> {
    this.setApiOption('/GetByDataMovimentacaoRealizada'); 
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${dataMovRealIni}/${dataMovRealFim}`);
  }

  GetGroupBySaldoDiario(dataMovRealIni: string, dataMovRealFim: string): Observable<any[]> {
    this.setApiOption('/GetGroupBySaldoDiario'); 
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${dataMovRealIni}/${dataMovRealFim}`);
  }

  GetUltimaDataSaldo(): Observable<any>{
    this.setApiOption('/GetUltimaDataSaldo'); 
    return this.http.get<any>(`${this.getUrl()}`);
  }

  GetMaxGroupBySaldoConta(dataReferencia: string): Observable<any[]> {
    this.setApiOption('/GetMaxGroupBySaldoConta'); 
    return this.http.get<any[]>(`${this.getUrl()}/${dataReferencia}`);
  } 

  GetSaldoConta(idConta: number, dataReferencia: string): Observable<any> {
    this.setApiOption('/GetSaldoConta'); 
    return this.http.get<any[]>(`${this.getUrl()}/${idConta}/${dataReferencia}`);
  } 
  
  GetByMovimentacaoRealizadaMensalReportExcel(idContas={}, dataReferencia: string, totalMeses): Observable<any>{
    var param = {
      idContas: idContas,
      dataReferencia: dataReferencia,
      totalMeses: totalMeses
    }
    this.setApiOption('/GetByMovimentacaoRealizadaMensalReportExcel');
    return this.http.post(this.getUrl(), param, {responseType: "blob"});
  }
}