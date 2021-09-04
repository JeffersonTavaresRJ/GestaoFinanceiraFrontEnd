import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";
import { Movimentacao } from "./movimentacao";

export class MovimentacaoRealizada extends GenericResourceModel{
   constructor(
    public movimentacao: Movimentacao = null,
    public dataMovimentacaoRealizada: Date=null,
    public valor: number=null,
    public idConta: number=null
   ){
     super();
     this.movimentacao = new Movimentacao();
   }
   static fromJson(jsonData: any): MovimentacaoRealizada {
    return Object.assign(new MovimentacaoRealizada(), jsonData);
  }
}