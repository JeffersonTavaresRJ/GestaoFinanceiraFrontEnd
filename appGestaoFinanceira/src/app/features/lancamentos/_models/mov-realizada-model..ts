import { Conta } from "../../cadastros-basicos/_models/conta-model";
import { FormaPagamento } from "../../cadastros-basicos/_models/forma-pagamento";
import { Movimentacao } from "./movimentacao";

export class MovimentacaoRealizada extends Movimentacao{
    constructor(
    public conta: Conta = new Conta(),
    public formaPagamento: FormaPagamento= new FormaPagamento(),
    public dataReferencia: Date = null,
    public id: number=null,
    public dataMovimentacaoRealizada: Date=null,
    public tipoPrioridade: string = null,
    public tipoPrioridadeDescricao: string = null,
    public observacao: string = null,
   ){
     super();     
   }
}