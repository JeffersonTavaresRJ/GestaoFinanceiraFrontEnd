import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';

@Injectable({
  providedIn: 'root'
})
export class MovRealizadaService extends GenericResourceService<MovimentacaoRealizada> {

  constructor(private injector: Injector) { 
    super(injector, 'api/MovimentacaoRealizada'); 
  }

  put(movRealizada: MovimentacaoRealizada): Observable<any> {
    debugger;  
    return this.http.put(this.getUrl(), MovimentacaoRealizada.fromPut(movRealizada))
      .pipe(catchError(this.handlerError)/*,
            --comentado para ler o retorno da mensagem de sucesso da API..
            map(()=>resource)*/);
  }

  getByDataReferencia(idItemMovimentacao: number, dataReferencia: string): Observable<MovimentacaoRealizada[]> {
    this.setApiOption('/GetByDataReferencia');
    debugger;
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`);
  }

  GetByDataMovimentacaoRealizada(idItemMovimentacao: number, dataMovRealIni: string, dataMovRealFim: string): Observable<MovimentacaoRealizada[]> {
    this.setApiOption('/GetByDataMovimentacaoRealizada');
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${idItemMovimentacao}/${this.idUsuario}/${dataMovRealIni}/${dataMovRealFim}`);
  }
}