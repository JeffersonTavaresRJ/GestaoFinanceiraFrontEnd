import { GenericResourceModel } from "../../../shared/_models/generic-resource-model";
import { ItemMovimentacao } from "../../cadastros-basicos/_models/item-movimentacao-model";

export class Movimentacao extends GenericResourceModel{
    constructor(
        public itemMovimentacao: ItemMovimentacao=new ItemMovimentacao(),
        public dataReferencia: Date | null=null,
        public tipoPrioridade: string | null=null,
        public tipoPrioridadeDescricao: string | null=null,
        public observacao: string | null=null,
        public valor:number=0
    ){
        super();
    }
}