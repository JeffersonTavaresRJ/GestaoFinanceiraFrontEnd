import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { ItemMovimentacao } from "../_models/item-movimentacao-model";
@Injectable({
    providedIn: 'root'
  })
export class ItemMovimentacaoService extends GenericResourceService<ItemMovimentacao>{
    constructor(private injector: Injector){
        super(injector, 'api/ItemMovimentacao');
    }

    public getAllTipo():Observable<any>{
       this.setApiOption('/GetAllTipo');
       return this.http.get(this.getUrl());
    }
}