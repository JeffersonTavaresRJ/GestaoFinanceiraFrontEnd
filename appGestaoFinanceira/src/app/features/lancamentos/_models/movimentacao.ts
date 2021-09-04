import { ItemMovimentacao } from "../../cadastros-basicos/_models/item-movimentacao-model"

export class Movimentacao{
    constructor(
        public itemMovimentacao: ItemMovimentacao=null,
        public dataReferencia: Date=null,
        public tipoPrioridade: string=null,
        public tipoPrioridadeDescricao: string=null,
        public observacao: string=null
    ){}
}