import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";

export class MovimentacaoRealizadaCommandDelete extends GenericCommand {
    constructor(
        public id: number = null
    ) { super(); };

    static convertModelToCommand(movimentacaoRealizada: MovimentacaoRealizada):MovimentacaoRealizadaCommandDelete{
        return new MovimentacaoRealizadaCommandDelete(
            movimentacaoRealizada.id
        )
    }
}