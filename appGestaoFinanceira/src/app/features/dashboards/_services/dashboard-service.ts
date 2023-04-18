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

    GetSaldoAnualPorConta(ano: number): Observable<any[]> {
        this.setApiOption('/GetSaldoAnualPorConta'); 
        return this.http.get<any[]>(`${this.getUrl()}/${ano}`);
      }
    
      GetSaldoAnualPorPeriodo(anoInicial: number, anoFinal: number): Observable<any[]> {
        this.setApiOption('/GetSaldoAnualPorPeriodo'); 
        return this.http.get<any[]>(`${this.getUrl()}/${anoInicial}/${anoFinal}`);
      }

    
}