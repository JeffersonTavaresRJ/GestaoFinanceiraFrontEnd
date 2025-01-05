import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';
import { MovimentacaoPrevistaCommandCreate } from './_commands/mov-prevista/mov-prevista-cmd-create';
import { MovimentacaoPrevistaCommandDelete } from './_commands/mov-prevista/mov-prevista-cmd-delete';
import { MovimentacaoPrevistaCommandUpdate } from './_commands/mov-prevista/mov-prevista-cmd-update';
import { GenericResourceDropDownEnumModel } from '../../../shared/components/generic-resource-dropdown/models/generic-resource-dropdown-enum-model';

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

  getByDataVencimento(dataVencIni: string, dataVencFim: string, idItemMovimentacao: number=null): Observable<MovimentacaoPrevista[]> {
    this.setApiOption('/GetByDataVencimento');
    //parâmetro opcional da API..
    var _idItemMovimentacao = idItemMovimentacao!=null || idItemMovimentacao != undefined ? idItemMovimentacao.toString() : ' ';
    return this.http.get<MovimentacaoPrevista[]>(`${this.getUrl()}/${dataVencIni}/${dataVencFim}/${_idItemMovimentacao}`);
  }

  public GetAllStatus(): Observable <GenericResourceDropDownEnumModel[]> {
    this.setApiOption('/GetAllStatus');
    return this.http.get<GenericResourceDropDownEnumModel[]>(this.getUrl());
  }

  public GetAllPrioridades(): Observable<GenericResourceDropDownEnumModel[]> {
    this.setApiOption('/GetAllPrioridades');
    return this.http.get<GenericResourceDropDownEnumModel[]>(this.getUrl());
  }

  public GetAllEnuns(endPoint:String): Observable <GenericResourceDropDownEnumModel[]> {
    this.setApiOption(`${endPoint}`);
    return this.http.get<GenericResourceDropDownEnumModel[]>(this.getUrl());
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