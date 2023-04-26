import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { GenericReaderResourceService } from "src/app/shared/_services/generic-reader-resource-service";
@Injectable({
    providedIn: 'root'
})
export class DashboardService extends GenericReaderResourceService<any>{
    constructor(private injector: Injector) {
        super(injector, 'api/MovimentacaoRealizada')
    }

    GetSaldoMensalPorConta(ano: number): Observable<any[]> {
        this.setApiOption('/GetSaldoMensalPorConta'); 
        return this.http.get<any[]>(`${this.getUrl()}/${ano}`);
    }
    
    GetSaldoAnualPorConta(anoInicial: number, anoFinal: number): Observable<any[]> {
        this.setApiOption('/GetSaldoAnualPorConta'); 
        return this.http.get<any[]>(`${this.getUrl()}/${anoInicial}/${anoFinal}`);
    } 
    
    GetItemMovimentacaoMensal(dataIni: string, dataFim: string): Observable<any[]> {
      this.setApiOption('/GetItemMovimentacaoMensal'); 
      return this.http.get<any[]>(`${this.getUrl()}/${dataIni}/${dataFim}`);
  }    
}