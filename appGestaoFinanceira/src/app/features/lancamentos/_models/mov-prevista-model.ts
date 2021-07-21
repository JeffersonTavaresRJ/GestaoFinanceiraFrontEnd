export class MovimentacaoPrevista{
    constructor(
     public idItemMovimentacao: number=null,
     public dataReferencia: Date=null,
     public valor: number=null,
     public status: string=null,
     public idFormaPagamento: number=null
    ){}

    static fromJson(jsonData: any): MovimentacaoPrevista {
        return Object.assign(new MovimentacaoPrevista(), jsonData);
      }
}