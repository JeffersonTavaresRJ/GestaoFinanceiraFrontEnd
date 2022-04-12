import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";

export class MovimentacaoRealizadaCommandCreate extends GenericCommand {
        /*
{
    "idItemMovimentacao": 0,
    "dataReferencia": "2022-04-12T20:08:38.030Z",
    "tipoPrioridade": "string",
    "observacao": "string",
    "dataMovimentacaoRealizada": "2022-04-12T20:08:38.031Z",
    "valor": 0,
    "idFormaPagamento": 0,
    "idConta": 0
  }
        */
    constructor(
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataMovimentacaoRealizada: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public idConta: number = null
    ) { super();  };

    static convertModelToCommand(movimentacaoRealizada: MovimentacaoRealizada):MovimentacaoRealizadaCommandCreate{
        return new MovimentacaoRealizadaCommandCreate(
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
        );
    }
}