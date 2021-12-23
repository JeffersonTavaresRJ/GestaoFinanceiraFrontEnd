import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { ItemMovimentacao } from "../../../_models/item-movimentacao-model";

export class ItemMovimentacaoCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertModelToCommand(itemMovimentacao: ItemMovimentacao):ItemMovimentacaoCommandDelete{
        return new ItemMovimentacaoCommandDelete(
            itemMovimentacao.id            
        )
    }
}