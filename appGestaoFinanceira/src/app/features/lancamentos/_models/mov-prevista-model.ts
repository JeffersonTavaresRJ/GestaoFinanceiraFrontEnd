import { Observable} from 'rxjs';
import {FormaPagamento} from '../../cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { Movimentacao } from "./movimentacao";

export class MovimentacaoPrevista extends Movimentacao{
    
    private static movimentacaoPrevista: MovimentacaoPrevista = new MovimentacaoPrevista();
    
    constructor(
     public formaPagamento: FormaPagamento=null,
     public idFormaPagamento: number=null,
     public dataVencimento: Date=null,
     public valor: number=null,
     public movPrevistaStatus: string=null,
     public movPrevistaStatusDescricao: string=null,
     public tipoRecorrencia: string=null,
     public nrParcela: number=null,
     public nrParcelaTotal: number=null,
     public status_: string=null
    ){ 
        super();
        this.itemMovimentacao = new ItemMovimentacao();
        this.formaPagamento = new FormaPagamento();
    }
    
    private static movPrev: MovimentacaoPrevista;
    private static arMovimentacoesPrevistas: MovimentacaoPrevista[]=[];

    static gerarRecorrencias(movimentacaoPrevista: MovimentacaoPrevista, total: number):Observable<MovimentacaoPrevista[]>{
        //debugger;
        var item = 0;
        var valorSum=0;
        this.arMovimentacoesPrevistas.length=0;
        
        while(item < total){  
       
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
            this.movPrev.movPrevistaStatus = movimentacaoPrevista.movPrevistaStatus;
            this.movPrev.movPrevistaStatusDescricao = movimentacaoPrevista.movPrevistaStatusDescricao;
            this.movPrev.tipoPrioridade = movimentacaoPrevista.tipoPrioridade;
            this.movPrev.tipoPrioridadeDescricao = movimentacaoPrevista.tipoPrioridadeDescricao;
            this.movPrev.tipoRecorrencia = movimentacaoPrevista.tipoRecorrencia;            

            if(movimentacaoPrevista.tipoRecorrencia=='P'){
                //Recorrência Parcelada..
                this.movPrev.nrParcela = item+1;
                this.movPrev.nrParcelaTotal = total;

                if(this.movPrev.nrParcela == this.movPrev.nrParcelaTotal){
                    debugger;
                    //a última parcela será a diferença do valor total..                    
                    this.movPrev.valor= Number((movimentacaoPrevista.valor - valorSum).toFixed(2));                    
                }else{
                    this.movPrev.valor = Number((movimentacaoPrevista.valor/(total)).toFixed(2));
                    valorSum += this.movPrev.valor;
                }

            }else{
                //Recorrência Mensal..
                this.movPrev.valor = movimentacaoPrevista.valor;
                this.movPrev.nrParcela = 1;
                this.movPrev.nrParcelaTotal = 1;
            }
            
            this.arMovimentacoesPrevistas.push(this.movPrev);
    
            item++;
          };
        //ordenação por YYYYMM numérico..
        this.arMovimentacoesPrevistas.sort(function(a,b){return (((b.dataReferencia.getFullYear()*100)+b.dataReferencia.getMonth())-
            ((a.dataReferencia.getFullYear()*100)+a.dataReferencia.getMonth()));
        });
        
        return new Observable(o=>{
            o.next(this.arMovimentacoesPrevistas)
            o.complete();            
        });        
    }
}