import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";


export class MovimentacaoRealizadaCommandUpdate extends GenericCommand {
    constructor(
        public id: number = null,
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataMovimentacaoRealizada: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public idConta: number = null
    ) { super(); };

    static convertModelToCommand(movimentacaoRealizada: MovimentacaoRealizada):MovimentacaoRealizadaCommandUpdate{
        return new MovimentacaoRealizadaCommandUpdate(
            movimentacaoRealizada.id,
            movimentacaoRealizada.itemMovimentacao.id,
            new Date(movimentacaoRealizada.dataMovimentacaoRealizada.getFullYear(), 
            movimentacaoRealizada.dataMovimentacaoRealizada.getMonth()+1,
            0),
            movimentacaoRealizada.tipoPrioridade,
            movimentacaoRealizada.observacao,
            movimentacaoRealizada.dataMovimentacaoRealizada,
            movimentacaoRealizada.valor,
            movimentacaoRealizada.formaPagamento.id,
            movimentacaoRealizada.conta.id            
        )
    }
}