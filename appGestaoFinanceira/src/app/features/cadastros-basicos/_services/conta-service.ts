import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Conta } from "../_models/conta-model";
import { ContaCommandCreate } from "./commands/conta/conta-cmd-create";
import { ContaCommandDelete } from "./commands/conta/conta-cmd-delete";
import { ContaCommandUpdate } from "./commands/conta/conta-cmd-update";
import { catchError } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class ContaService extends GenericResourceService<Conta>{
    constructor(private injector: Injector) {
        super(injector, 'api/Conta',
        ContaCommandCreate.convertFormGroupToCommand,
        ContaCommandUpdate.convertFormGroupToCommand,
        ContaCommandDelete.convertFormGroupToCommand)
    }

    putConta(conta: Conta): Observable<any> {
        var command = ContaCommandUpdate.convertModelToCommand(conta);
        return this.http.put(this.getUrl(), command)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
      }
}