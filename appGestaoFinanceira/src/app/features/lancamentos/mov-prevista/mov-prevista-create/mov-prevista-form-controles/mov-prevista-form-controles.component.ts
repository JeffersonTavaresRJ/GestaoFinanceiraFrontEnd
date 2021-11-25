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
  

  arMovPrevistasEdit: MovimentacaoPrevista[];
  arFormasPagamento:FormaPagamento[];
  arStDate:string[];
  nrTotalRecorrencias:number=2;
  stDataVencimento: string;

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

  gerarRecorrencias(){ 
    if(this.nrTotalRecorrencias >= 2 && this.nrTotalRecorrencias <= 24){
      this.arMovPrevistas = MovimentacaoPrevista.gerarRecorrencias(this.arMovPrevistas[0], this.nrTotalRecorrencias-1); 
      this.arMovPrevistasEdit = this.arMovPrevistas.slice();
      this.arMovPrevistasEditada.emit(this.arMovPrevistasEdit);
     }    
  } 
  
  onRowEditInit(movPrevista: MovimentacaoPrevista) {
    var idx = this.getIdxArray(movPrevista);
    this.stDataVencimento = DateConvert.formatDateDDMMYYYY(movPrevista.dataVencimento, '/');
    this.clonedMovPrevista[idx] = {...movPrevista};    
  }

  onRowEditSave(movPrevista: MovimentacaoPrevista) {
    debugger;
    this.arStDate = this.stDataVencimento.split('/');

    if(Number.parseInt(this.arStDate[2]) != movPrevista.dataReferencia.getFullYear() ||
      (Number.parseInt(this.arStDate[1])-1) != movPrevista.dataReferencia.getMonth()){
          this.alertMessageForm.showError("Data fora do mês/ano da recorrência", "Sr. Usuário");
    }else{
      movPrevista.dataVencimento = new Date(Number.parseInt(this.arStDate[2]), Number.parseInt(this.arStDate[1])-1, Number.parseInt(this.arStDate[0]));
    
      this.arFormasPagamento.filter(f => f.id == movPrevista.idFormaPagamento).map(f => {
         movPrevista.formaPagamento = f;
      });

      if (movPrevista.valor > 0) {
          var idx = this.getIdxArray(movPrevista);
          delete this.clonedMovPrevista[idx];
          this.arMovPrevistasEdit = this.arMovPrevistas.slice();
          this.arMovPrevistasEditada.emit(this.arMovPrevistasEdit);
      }
    }    
  }

  onRowEditCancel(movPrevista: MovimentacaoPrevista, ri: number) {
    var idx = this.getIdxArray(movPrevista);
    this.arMovPrevistas[ri] = this.clonedMovPrevista[idx];
    delete this.clonedMovPrevista[idx];
  }

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
}