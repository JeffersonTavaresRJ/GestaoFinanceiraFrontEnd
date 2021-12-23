import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";

export class MovimentacaoRealizadaCommandCreate extends GenericCommand {
        
    constructor(
        public dataMovimentacaoRealizada: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public idConta: number = null
    ) { super();  };

    static convertModelToCommand(movimentacaoRealizada: MovimentacaoRealizada):MovimentacaoRealizadaCommandCreate{
        return new MovimentacaoRealizadaCommandCreate(
            movimentacaoRealizada.dataMovimentacaoRealizada,
            movimentacaoRealizada.valor,
            movimentacaoRealizada.formaPagamento.id,
            movimentacaoRealizada.conta.id
        )
    }
}