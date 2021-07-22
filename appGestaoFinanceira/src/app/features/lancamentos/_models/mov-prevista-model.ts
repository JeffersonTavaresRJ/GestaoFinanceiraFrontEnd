import { ItemMovimentacao } from "../../cadastros-basicos/_models/item-movimentacao-model";
import {FormaPagamento} from '../../cadastros-basicos/_models/forma-pagamento';

export class MovimentacaoPrevista{
    constructor(
     public ItemMovimentacao: ItemMovimentacao=null,
     public dataReferencia: Date=null,
     public tipoPrioridade: string=null,
     public TipoPrioridadeDescricao: string=null,
     public Observacao: string=null,
     public FormaPagamento: FormaPagamento=null,
     public dataVencimento: Date=null,
     public valor: number=null,
     public status: string=null,
     public statusDescricao: string=null,
     public idFormaPagamento: number=null,
     public idItemMovimentacao: number=null
    ){}

    static fromJson(jsonData: any): MovimentacaoPrevista {
        return Object.assign(new MovimentacaoPrevista(), jsonData);
      }
}