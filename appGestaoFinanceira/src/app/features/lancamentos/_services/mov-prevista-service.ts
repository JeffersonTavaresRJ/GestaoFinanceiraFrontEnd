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

  getByKey(idItemMovimentacao: number, dataReferencia: string): Observable<MovimentacaoPrevista> {
    return this.http.get<MovimentacaoPrevista>(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`);
  }

  getByDataVencimento(idItemMovimentacao: number, dataVencIni: string, dataVencFim: string): Observable<MovimentacaoPrevista[]> {
    this.setApiOption('/GetByDataVencimento');
    return this.http.get<MovimentacaoPrevista[]>(`${this.getUrl()}/${idItemMovimentacao.toString().replace('0', ' ')}/${this.idUsuario}/${dataVencIni}/${dataVencFim}`);
  }

  public GetAllStatus(): Observable<any> {
    this.setApiOption('/GetAllStatus');
    return this.http.get(this.getUrl());
  }

  delete(idItemMovimentacao: number, dataReferencia: string): Observable<MovimentacaoPrevista> {
    return this.http.delete(`${this.getUrl()}/${idItemMovimentacao}/${dataReferencia}`)
      .pipe(catchError(this.handlerError));
  }
/*
  formatarData(data: Date): string {
    var dia_ = data.getDate();
    var mes_ = data.getMonth()+1;
    var ano = data.getFullYear();

    var dia = '';
    var mes = '';

    if (dia_.toString().length == 1) {
      dia = "0" + dia_.toString();
    }else{
      dia = dia_.toString();
    }

    if (mes_.toString().length == 1) {
      mes = "0" + mes_.toString();
    }else{
      mes =  mes_.toString();
    }
    
    return ano + '-' + mes + '-' + dia;
  }
  */
}
