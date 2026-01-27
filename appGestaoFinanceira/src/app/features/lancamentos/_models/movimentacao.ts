import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";
import { ItemMovimentacao } from "src/app/features/cadastros-basicos/_models/item-movimentacao-model";

export class Movimentacao extends GenericResourceModel{
    constructor(
        public itemMovimentacao: ItemMovimentacao=new ItemMovimentacao(),
        public dataReferencia: Date=null,
        public tipoPrioridade: string=null,
        public tipoPrioridadeDescricao: string=null,
        public observacao: string=null,
        public valor:number=0
    ){
        super();
    }
}