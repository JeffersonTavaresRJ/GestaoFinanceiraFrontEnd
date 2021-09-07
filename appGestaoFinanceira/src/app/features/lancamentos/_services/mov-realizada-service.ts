import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResourceService } from 'src/app/shared/_services/generic-resource-service';
import { MovimentacaoRealizada } from '../_models/mov-realizada-model.';

@Injectable({
  providedIn: 'root'
})
export class MovRealizadaService extends GenericResourceService<MovimentacaoRealizada> {

  constructor(private injector: Injector) { 
    super(injector, 'api/MovimentacaoRealizada'); 
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