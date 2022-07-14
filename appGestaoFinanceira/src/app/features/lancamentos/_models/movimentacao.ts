import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";
import { ItemMovimentacao } from "../../cadastros-basicos/_models/item-movimentacao-model"

export class Movimentacao extends GenericResourceModel{
    constructor(
        public itemMovimentacao: ItemMovimentacao=new ItemMovimentacao(),
        public dataReferencia: Date=null,
        public tipoPrioridade: string=null,
        public tipoPrioridadeDescricao: string=null,
        public observacao: string=null
    ){
        super();
    }
}