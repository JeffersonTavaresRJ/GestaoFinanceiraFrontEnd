import {FormaPagamento} from '../../cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { Movimentacao } from "./movimentacao";

export class MovimentacaoPrevista extends Movimentacao{
    constructor(
     public formaPagamento: FormaPagamento=null,
     public dataVencimento: Date=null,
     public valor: number=null,
     public status: string=null,
     public statusDescricao: string=null,
     public tipoRecorrencia: string=null,
     public qtdeParcelas: string=null
    ){ 
        super();
        this.itemMovimentacao = new ItemMovimentacao();
        this.formaPagamento = new FormaPagamento();
    }

    static fromJson(jsonData: any): MovimentacaoPrevista {
        return Object.assign(new MovimentacaoPrevista(), jsonData);
    }    
}