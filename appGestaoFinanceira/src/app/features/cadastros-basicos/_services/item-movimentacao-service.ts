import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { ItemMovimentacao } from "../_models/item-movimentacao-model";
import { catchError } from "rxjs/operators";
import { ItemMovimentacaoCommandCreate } from "./commands/item-movimentacao/item-movimentacao-cmd-create";
import { ItemMovimentacaoCommandDelete } from "./commands/item-movimentacao/item-movimentacao-cmd-delete";
import { ItemMovimentacaoCommandUpdate } from "./commands/item-movimentacao/item-movimentacao-cmd-update";
@Injectable({
    providedIn: 'root'
  })
export class ItemMovimentacaoService extends GenericResourceService<ItemMovimentacao>{
    constructor(private injector: Injector){
        super(injector, 'api/ItemMovimentacao',
        ItemMovimentacaoCommandCreate.convertFormGroupToCommand,
        ItemMovimentacaoCommandUpdate.convertFormGroupToCommand,
        ItemMovimentacaoCommandDelete.convertFormGroupToCommand);
    }

    public getAllTipo():Observable<any>{
       this.setApiOption('/GetAllTipo');
       return this.http.get(this.getUrl());
    }

    GetAllReportExcel(): Observable<any>{
        this.setApiOption('/GetAllReportExcel');
        return this.http.get(this.getUrl(), {responseType: 'blob'})
          .pipe(catchError(this.handlerError));
    }
}