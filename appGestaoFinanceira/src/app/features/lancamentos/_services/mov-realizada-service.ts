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
    MovimentacaoRealizadaCommandCreate.convertModelToCommand,
    MovimentacaoRealizadaCommandUpdate.convertModelToCommand,
    MovimentacaoRealizadaCommandDelete.convertModelToCommand); 
  }

  getByDataReferencia(idItemMovimentacao: number, dataReferencia: string): Observable<MovimentacaoRealizada[]> {
    this.setApiOption('/GetByDataReferencia');
    debugger;
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`);
  }

  GetGroupBySaldoDiario(dataMovRealIni: string, dataMovRealFim: string): Observable<any[]> {
    this.setApiOption('/GetGroupBySaldoDiario'); 
    return this.http.get<MovimentacaoRealizada[]>(`${this.getUrl()}/${this.idUsuario}/${dataMovRealIni}/${dataMovRealFim}`);
  }
}