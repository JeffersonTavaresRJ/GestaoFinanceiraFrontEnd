import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { ItemMovimentacao } from "../../../_models/item-movimentacao-model";

export class ItemMovimentacaoCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null,
        public tipo: string = null,
        public idCategoria: number = null
    ) { super();  };

    static convertModelToCommand(itemMovimentacao: ItemMovimentacao):ItemMovimentacaoCommandCreate{
        return new ItemMovimentacaoCommandCreate(
            itemMovimentacao.descricao,
            itemMovimentacao.tipo,
            itemMovimentacao.idCategoria
        )
    }
}