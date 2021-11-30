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
        var valorSum=0;
        this.arMovimentacoesPrevistas.length=0;
        
        while(item <= total){  
       
            this.movPrev = new MovimentacaoPrevista(); 
            
            this.movPrev.dataReferencia = new Date(movimentacaoPrevista.dataVencimento.getFullYear(), 
                                                   movimentacaoPrevista.dataVencimento.getMonth()+item+1,
                                                   0);
            this.movPrev.dataVencimento = new Date(movimentacaoPrevista.dataVencimento.getFullYear(), 
                                                   movimentacaoPrevista.dataVencimento.getMonth()+item,
                                                   movimentacaoPrevista.dataVencimento.getDate());

            //tratamento para o mês de fevereiro, quando o dia for 29 (ano não bissexto),30 ou 31..
            this.movPrev.dataVencimento = this.movPrev.dataVencimento > this.movPrev.dataReferencia ? 
                                            this.movPrev.dataReferencia : this.movPrev.dataVencimento;
            
            
            this.movPrev.formaPagamento = movimentacaoPrevista.formaPagamento;
            this.movPrev.idFormaPagamento = movimentacaoPrevista.formaPagamento.id;
            this.movPrev.itemMovimentacao = movimentacaoPrevista.itemMovimentacao;
            this.movPrev.observacao = movimentacaoPrevista.observacao;
            this.movPrev.status = movimentacaoPrevista.status;
            this.movPrev.statusDescricao = movimentacaoPrevista.statusDescricao;
            this.movPrev.tipoPrioridade = movimentacaoPrevista.tipoPrioridade;
            this.movPrev.tipoPrioridadeDescricao = movimentacaoPrevista.tipoPrioridadeDescricao;
            this.movPrev.tipoRecorrencia = movimentacaoPrevista.tipoRecorrencia;
            this.movPrev.nrParcela = item+1;
            this.movPrev.nrParcelaTotal = total;

            if(movimentacaoPrevista.tipoRecorrencia=='P'){
                this.movPrev.valor = movimentacaoPrevista.valor/(total+1);
                this.movPrev.valor = Math.round(this.movPrev.valor * 100) / 100;                

                if(item == total){
                    //a última parcela será a diferença do valor total..
                    this.movPrev.valor = Math.abs(movimentacaoPrevista.valor - valorSum);                    
                }else{
                    valorSum += this.movPrev.valor;
                }   

            }else{
                this.movPrev.valor = movimentacaoPrevista.valor;
            }
            
            this.arMovimentacoesPrevistas.push(this.movPrev);
    
            item++;
          };
        return this.arMovimentacoesPrevistas.sort(function(a,b){return b.nrParcela-a.nrParcela});
    }
}