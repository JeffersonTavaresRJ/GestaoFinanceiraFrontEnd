import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoPrevista } from "../../../_models/mov-prevista-model";

export class MovimentacaoPrevistaCommandCreate extends GenericCommand {
        
    constructor(
        public idItemMovimentacao: number = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataReferencia: Date = null,
        public dataVencimento: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public nrParcela: number = null,
        public nrParcelaTotal: number
    ) { super();  };

    static convertModelToCommand(movimentacaoPrevista: MovimentacaoPrevista):MovimentacaoPrevistaCommandCreate{
        return new MovimentacaoPrevistaCommandCreate(
            movimentacaoPrevista.itemMovimentacao.id,
            movimentacaoPrevista.tipoPrioridade,
            movimentacaoPrevista.observacao,
            new Date(movimentacaoPrevista.dataVencimento.getFullYear(), 
                    movimentacaoPrevista.dataVencimento.getMonth()+1,
                    0),
            movimentacaoPrevista.dataVencimento,
            movimentacaoPrevista.valor,
            movimentacaoPrevista.formaPagamento.id,
            movimentacaoPrevista.nrParcela,
            movimentacaoPrevista.nrParcelaTotal
        )
    }
}