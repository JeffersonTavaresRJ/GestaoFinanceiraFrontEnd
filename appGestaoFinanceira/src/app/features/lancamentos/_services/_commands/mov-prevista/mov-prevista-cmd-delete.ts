import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoPrevista } from "../../../_models/mov-prevista-model";

export class MovimentacaoPrevistaCommandDelete extends GenericCommand {
    constructor(
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null
    ) { super(); };

    static convertModelToCommand(movimentacaoPrevista: MovimentacaoPrevista):MovimentacaoPrevistaCommandDelete{
        return new MovimentacaoPrevistaCommandDelete(
            movimentacaoPrevista.itemMovimentacao.id,
            movimentacaoPrevista.dataReferencia
        )
    }
}