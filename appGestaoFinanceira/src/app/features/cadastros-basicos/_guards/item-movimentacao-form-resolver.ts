import { Injectable } from "@angular/core";
import { GenericFormResolver } from "src/app/shared/_guards/generic-form-resolver";
import { ItemMovimentacao } from "../_models/item-movimentacao-model";
import { ItemMovimentacaoService } from "../_services/item-movimentacao-service";

@Injectable()
export class ItemMovimentacaoFormResolver extends GenericFormResolver<ItemMovimentacao> {
    
    constructor(public ItemMovimentacaoService : ItemMovimentacaoService){  
        super(ItemMovimentacaoService);      
    }   
}