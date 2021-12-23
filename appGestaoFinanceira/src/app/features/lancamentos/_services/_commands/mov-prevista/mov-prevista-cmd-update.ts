import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoPrevista } from "../../../_models/mov-prevista-model";

export class MovimentacaoPrevistaCommandUpdate extends GenericCommand {
    constructor(
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,  
        public dataVencimento: Date = null,
        public valor: number = null,
        public status: string = null,
        public idFormaPagamento: number = null
    ) { super(); };

    static convertModelToCommand(movimentacaoPrevista: MovimentacaoPrevista):MovimentacaoPrevistaCommandUpdate{
        return new MovimentacaoPrevistaCommandUpdate(
            movimentacaoPrevista.itemMovimentacao.id,
            movimentacaoPrevista.dataReferencia,
            movimentacaoPrevista.tipoPrioridade,
            movimentacaoPrevista.observacao,            
            movimentacaoPrevista.dataVencimento,
            movimentacaoPrevista.valor,
            movimentacaoPrevista.status,
            movimentacaoPrevista.formaPagamento.id
        )
    }
}