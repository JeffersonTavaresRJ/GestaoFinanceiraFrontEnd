import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';


@Component({
  selector: 'app-mov-prevista-form-controles',
  templateUrl: './mov-prevista-form-controles.component.html',
  styleUrls: ['./mov-prevista-form-controles.component.css']
})
export class MovPrevistaFormControlesComponent implements OnInit {
  
  @Input() arMovPrevistas:MovimentacaoPrevista[];
  @Input() tipoRecorrencia:string;
  @Output() arMovPrevistasEditada = new EventEmitter(); 
  @Output('edicaoParcela') parcelaEditada = new EventEmitter(); 

  arFormasPagamento:FormaPagamento[];
  arStDate:string[];
  nrTotalRecorrencias:number=2;
  //arrays para criticar a data e o valor, não alterando diretamente o objeto..
  stDataVencimento:string[]=[];
  stValor:string[]=[];

  dtVen: Date;
  nrVal:number;

  clonedMovPrevista: { [s: string]: MovimentacaoPrevista; } = {};
  
  constructor(private formaPagamentoService: FormaPagamentoService,
              private alertMessageForm: AlertMessageForm) { }
  

  ngOnInit(): void {
    this.formaPagamentoService.getAll().subscribe(
      (result) => {
        this.arFormasPagamento = result;
        this.arFormasPagamento.filter(f => f.status == true);
      }
    );
  }
  
  onRowEditInit(movPrevista: MovimentacaoPrevista, ri:number) {
    this.stDataVencimento[ri] = DateConvert.formatDateDDMMYYYY(movPrevista.dataVencimento, '/');
    this.stValor[ri]=movPrevista.valor.toString();
    this.clonedMovPrevista[movPrevista.nrParcela] = {...movPrevista};    
  }

  onRowEditSave(movPrevista: MovimentacaoPrevista, ri:number) {
    debugger;
    //crítica do valor..
    if (!(Number.parseFloat(this.stValor[ri]) > 0)){
      this.alertMessageForm.showError("Valor Inválido", "Sr. Usuário");
      return false;
    }

    //crítica da data de vencimento..
    this.arStDate = this.stDataVencimento[ri].split('/');

    if(Number.parseInt(this.arStDate[2]) != movPrevista.dataReferencia.getFullYear() ||
      (Number.parseInt(this.arStDate[1])-1) != movPrevista.dataReferencia.getMonth()){
          this.alertMessageForm.showError("Data fora do mês/ano da recorrência", "Sr. Usuário");
          return false;
      }
    
    //sinaliza que ocorreu uma edição da recorrência de parcela, para mensagem interrogativa na tela de cadastro..
    this.dtVen = new Date(Number.parseInt(this.arStDate[2]), Number.parseInt(this.arStDate[1])-1, Number.parseInt(this.arStDate[0]));
    this.nrVal = Number.parseFloat(this.stValor[ri]);

    if( DateConvert.formatDateDDMMYYYY(movPrevista.dataVencimento, '/') != DateConvert.formatDateDDMMYYYY(this.dtVen, '/') || 
        movPrevista.valor != this.nrVal){
        this.parcelaEditada.emit(true);   
    }

    //setando o value de cada objeto..
    movPrevista.dataVencimento = new Date(Number.parseInt(this.arStDate[2]), Number.parseInt(this.arStDate[1])-1, Number.parseInt(this.arStDate[0]));
    movPrevista.valor = Number.parseFloat(this.stValor[ri]);

    this.arFormasPagamento.filter(f => f.id == movPrevista.idFormaPagamento).map(f => {
         movPrevista.formaPagamento = f;
    });

    delete this.clonedMovPrevista[movPrevista.nrParcela];
    this.arMovPrevistasEditada.emit(this.arMovPrevistas);      
       
  }

  onRowEditCancel(movPrevista: MovimentacaoPrevista, ri: number) {
    this.arMovPrevistas[ri] = this.clonedMovPrevista[movPrevista.nrParcela];
    delete this.clonedMovPrevista[movPrevista.nrParcela];
  }

  /*
  private getIdxArray(movPrevista: MovimentacaoPrevista):number{
      var idx=0;
    this.arMovPrevistas.forEach(function(mp){
        if(mp.itemMovimentacao.id==movPrevista.itemMovimentacao.id &&
           mp.dataReferencia == movPrevista.dataReferencia){
             return idx
        }
        idx++;    
    });   
    return idx;
  }
  */
}