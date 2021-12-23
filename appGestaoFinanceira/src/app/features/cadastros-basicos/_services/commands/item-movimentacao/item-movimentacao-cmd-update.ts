import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { ItemMovimentacao } from "../../../_models/item-movimentacao-model";


export class ItemMovimentacaoCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public tipo: string = null,
        public status: boolean = null,
        public idCategoria: number = null
    ) { super(); };

    static convertModelToCommand(itemMovimentacao: ItemMovimentacao):ItemMovimentacaoCommandUpdate{
        return new ItemMovimentacaoCommandUpdate(
            itemMovimentacao.id,
            itemMovimentacao.descricao,
            itemMovimentacao.tipo,
            itemMovimentacao.status,
            itemMovimentacao.idCategoria            
        )
    }
}