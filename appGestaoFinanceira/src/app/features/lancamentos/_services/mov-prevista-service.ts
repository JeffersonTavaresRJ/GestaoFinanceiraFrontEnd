import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovimentacaoPrevistaCommandCreate } from './_commands/mov-prevista/mov-prevista-cmd-create';
import { MovimentacaoPrevistaCommandDelete } from './_commands/mov-prevista/mov-prevista-cmd-delete';
import { MovimentacaoPrevistaCommandUpdate } from './_commands/mov-prevista/mov-prevista-cmd-update';

@Injectable({
  providedIn: 'root'
})
export class MovPrevistaService extends GenericResourceService<MovimentacaoPrevista> {

  constructor(private injector: Injector) {
    super(injector, 'api/MovimentacaoPrevista', 
          MovimentacaoPrevistaCommandCreate.convertFormGroupToCommand,
          MovimentacaoPrevistaCommandUpdate.convertFormGroupToCommand,
          MovimentacaoPrevistaCommandDelete.convertFormGroupToCommand);
  }

  getByKey(idItemMovimentacao: number, dataReferencia: string): Observable<MovimentacaoPrevista> {
    return this.http.get<MovimentacaoPrevista>(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`);
  }

  getByDataVencimento(dataVencIni: string=null, dataVencFim: string=null, idItemMovimentacao: number=null): Observable<MovimentacaoPrevista[]> {
    this.setApiOption('/GetByDataVencimento');
    //parâmetro opcional da API..
    var _idItemMovimentacao = idItemMovimentacao!=null || idItemMovimentacao != undefined ? idItemMovimentacao.toString() : ' ';
    var _dataVencIni = dataVencIni!=null || dataVencIni != undefined ? dataVencIni.toString() : ' ';
    var _dataVencFim = dataVencFim!=null || dataVencFim != undefined ? dataVencFim.toString() : ' ';
    return this.http.get<MovimentacaoPrevista[]>(`${this.getUrl()}/${_dataVencIni}/${_dataVencFim}/${_idItemMovimentacao}`);
  }

  public GetAllStatus(): Observable<any> {
    this.setApiOption('/GetAllStatus');
    return this.http.get(this.getUrl());
  }

  public GetAllPrioridades(): Observable<any> {
    this.setApiOption('/GetAllPrioridades');
    return this.http.get(this.getUrl());
  }

  public GetAllTiposRecorrencias(): Observable<any> {
    this.setApiOption('/GetAllTipoRecorrencias');
    return this.http.get(this.getUrl());
  }

  delete(idItemMovimentacao: number, dataReferencia: string): Observable<any> {
    return this.http.delete(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`)
      .pipe(catchError(this.handlerError));
  }
}