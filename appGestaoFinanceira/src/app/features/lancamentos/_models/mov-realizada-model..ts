import { DateConvert } from "src/app/shared/functions/date-convert";
import { Conta } from "../../cadastros-basicos/_models/conta-model";
import { FormaPagamento } from "../../cadastros-basicos/_models/forma-pagamento";
import { ItemMovimentacao } from "../../cadastros-basicos/_models/item-movimentacao-model";
import { Movimentacao } from "./movimentacao";

export class MovimentacaoRealizada extends Movimentacao{
    constructor(
    public itemMovimentacao: ItemMovimentacao = new ItemMovimentacao(),    
    public conta: Conta = new Conta(),
    public formaPagamento: FormaPagamento=new FormaPagamento(),
    public dataReferencia: Date = null,
    public id: number=null,
    public dataMovimentacaoRealizada: Date=null,
    public tipoPrioridade: string = null,
    public observacao: string = null,
    public valor: number=null
   ){
     super();
     this.formaPagamento = new FormaPagamento();
     this.conta = new Conta();
   }

  static fromJson(jsonData: any): MovimentacaoRealizada {
    return new MovimentacaoRealizada(
      new ItemMovimentacao(Number.parseInt(jsonData.idItemMovimentacao), null, null, true, null, null),
      new Conta(Number.parseInt(jsonData.idConta), null, true),
      new FormaPagamento(Number.parseInt(jsonData.idFormaPagamento), null, true),
      new Date(new Date(jsonData.dataMovimentacaoRealizada).getFullYear(),
      new Date(jsonData.dataMovimentacaoRealizada).getMonth()+1,
      0),
      jsonData.id,
      new Date(jsonData.dataMovimentacaoRealizada),
      jsonData.tipoPrioridade,
      jsonData.observacao,
      jsonData.valor
    );
  }
}