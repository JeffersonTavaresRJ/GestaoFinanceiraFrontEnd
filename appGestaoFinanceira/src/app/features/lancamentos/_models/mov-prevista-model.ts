import {FormaPagamento} from '../../cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { Movimentacao } from "./movimentacao";

export class MovimentacaoPrevista extends Movimentacao{
    constructor(
     public formaPagamento: FormaPagamento=null,
     public idFormaPagamento: number=null,
     public dataVencimento: Date=null,
     public valor: number=null,
     public status: string=null,
     public statusDescricao: string=null,
     public tipoRecorrencia: string=null,
     public nrParcela: number=null,
     public nrParcelaTotal: number=null
    ){ 
        super();
        this.itemMovimentacao = new ItemMovimentacao();
        this.formaPagamento = new FormaPagamento();
    }
    
    private static movPrev: MovimentacaoPrevista;
    private static arMovimentacoesPrevistas: MovimentacaoPrevista[]=[];

    static fromJson(jsonData: any): MovimentacaoPrevista {
        return Object.assign(new MovimentacaoPrevista(), jsonData);
    }
    
    static gerarRecorrencias(movimentacaoPrevista: MovimentacaoPrevista, total: number):MovimentacaoPrevista[]{
        var item = 0;
        this.arMovimentacoesPrevistas.length=0;
        //debugger;
        while(item <= total){  
       
            this.movPrev = new MovimentacaoPrevista(); 
            
            this.movPrev.dataReferencia = new Date(movimentacaoPrevista.dataVencimento.getFullYear(), 
                                                   movimentacaoPrevista.dataVencimento.getMonth()+item+1,
                                                   0);
            this.movPrev.dataVencimento = new Date(movimentacaoPrevista.dataVencimento.getFullYear(), 
                                                   movimentacaoPrevista.dataVencimento.getMonth()+item,
                                                   movimentacaoPrevista.dataVencimento.getDate());
            this.movPrev.formaPagamento = movimentacaoPrevista.formaPagamento;
            this.movPrev.idFormaPagamento = movimentacaoPrevista.formaPagamento.id;
            this.movPrev.itemMovimentacao = movimentacaoPrevista.itemMovimentacao;
            this.movPrev.observacao = movimentacaoPrevista.observacao;
            this.movPrev.status = movimentacaoPrevista.status;
            this.movPrev.statusDescricao = movimentacaoPrevista.statusDescricao;
            this.movPrev.tipoPrioridade = movimentacaoPrevista.tipoPrioridade;
            this.movPrev.tipoPrioridadeDescricao = movimentacaoPrevista.tipoPrioridadeDescricao;
            this.movPrev.tipoRecorrencia = movimentacaoPrevista.tipoRecorrencia;
            this.movPrev.valor = movimentacaoPrevista.valor;

            if(movimentacaoPrevista.tipoRecorrencia=='P'){
                this.movPrev.nrParcela = item+1;
                this.movPrev.nrParcelaTotal = total;
            }else{
                this.movPrev.nrParcela = item+1;
                this.movPrev.nrParcelaTotal = item+1;
            }
            
            this.arMovimentacoesPrevistas.push(this.movPrev);
    
            item++;
          };
        return this.arMovimentacoesPrevistas;
    }
}