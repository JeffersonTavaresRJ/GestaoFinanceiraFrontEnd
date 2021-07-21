import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericBaseService } from 'src/app/shared/_services/generic-base-service';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

@Injectable({
  providedIn: 'root'
})
export class MovPrevistaService extends GenericBaseService<MovimentacaoPrevista> {

  constructor(private injector: Injector) {
    super(injector, 'api/MovimentacaoPrevista');
   }

   getByKey(idItemMovimentacao: number, dataReferencia :string):Observable<MovimentacaoPrevista>{
     return this.http.get<MovimentacaoPrevista>(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`);
   }

   getByDataVencimento(idItemMovimentacao: number, dataVencIni :string, dataVencFim: string):Observable<MovimentacaoPrevista[]>{
    this.setApiOption('/GetByDataVencimento'); 
    return this.http.get<MovimentacaoPrevista[]>(`${this.getUrl()}/${idItemMovimentacao}/${this.idUsuario}/${dataVencIni}/${dataVencFim}`);
  }

  public GetAllStatus():Observable<any>{
    this.setApiOption('/GetAllStatus');
    return this.http.get(this.getUrl());
 }

   delete(idItemMovimentacao: number, dataReferencia :string):Observable<MovimentacaoPrevista>{
    return this.http.delete(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`)
    .pipe(catchError(this.handlerError));
   }
}
