import { Injectable } from "@angular/core";
import { GenericListResolver } from "src/app/shared/_guards/generic-list-resolver";
import { ItemMovimentacao } from "../_models/item-movimentacao-model";
import { ItemMovimentacaoService } from "../_services/item-movimentacao-service";

@Injectable()
export class ItemMovimentacaoListResolver extends GenericListResolver<ItemMovimentacao> {
    
    constructor(public itemMovimentacaoService : ItemMovimentacaoService){  
        super(itemMovimentacaoService);      
    }    
}