import { Conta } from "../../cadastros-basicos/_models/conta-model";
import { FormaPagamento } from "../../cadastros-basicos/_models/forma-pagamento";
import { Movimentacao } from "./movimentacao";

export class MovimentacaoRealizada extends Movimentacao{
   constructor(
    public conta: Conta = null,
    public formaPagamento: FormaPagamento=null,
    public id: number=null,
    public dataMovimentacaoRealizada: Date=null,
    public valor: number=null
   ){
     super();
     this.formaPagamento = new FormaPagamento();
     this.conta = new Conta();
   }
   static fromJson(jsonData: any): MovimentacaoRealizada {
    return Object.assign(new MovimentacaoRealizada(), jsonData);
  }
}