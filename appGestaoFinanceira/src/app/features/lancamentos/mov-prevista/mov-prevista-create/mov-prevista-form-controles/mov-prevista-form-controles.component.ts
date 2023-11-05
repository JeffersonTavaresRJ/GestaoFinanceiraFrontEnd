import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { ConfirmationService } from 'primeng/api';
import { MovPrevistaService } from '../../../_services/mov-prevista-service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-mov-prevista-form-controles',
  templateUrl: './mov-prevista-form-controles.component.html',
  styleUrls: ['./mov-prevista-form-controles.component.css'],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class MovPrevistaFormControlesComponent implements OnInit {

  @Input('MovPrevista') movimentacaoPrevista: MovimentacaoPrevista;

  displayModal: boolean;
  displayError: boolean;
  headerDialog: string;
  criticaNovaParcela: boolean;
  nrTotalRecorrencias: number;
  nrTotalRecorrenciasOld: number;
  nrTotalValorParcelado: number=0;
  nrDiferValorParcelado: number=0;

  arFormasPagamento: FormaPagamento[];
  arMovPrevistas: MovimentacaoPrevista[]=[];
  arFormGroup: FormGroup[]=[];
  arStDate: string[];
  arvalidationErrors: any[] = [];

  //arrays para criticar a data e o valor, não alterando diretamente o objeto..
  arStDataVencimento: string[] = [];
  arStValor: string[] = [];

  dtDataVencimento: Date;
  nrValor: number;

  clonedMovPrevista: { [s: string]: MovimentacaoPrevista; } = {};

  constructor(private formaPagamentoService: FormaPagamentoService,
    private movPrevistaService: MovPrevistaService,
    private confirmationService: ConfirmationService,
    private alertMessageForm: AlertMessageForm) { }


  ngOnInit(): void {
    this.formaPagamentoService.getAll().subscribe(
      (result) => {
        this.arFormasPagamento = result;
        this.arFormasPagamento.filter(f => f.status == true);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.movimentacaoPrevista = changes.movimentacaoPrevista.currentValue;

    if (this.movimentacaoPrevista != null &&
        (this.movimentacaoPrevista.tipoRecorrencia == 'P' ||
         this.movimentacaoPrevista.tipoRecorrencia == 'M')
      ){
      if (this.movimentacaoPrevista.tipoRecorrencia == 'P') {
        this.headerDialog = "Novas Movimentações Previstas (Recorrências Parceladas)";
        this.nrTotalRecorrencias = 2;
      } else {
        this.headerDialog = "Novas Movimentações Previstas (Recorrência Mensal)";
        this.nrTotalRecorrencias = (12 - (this.movimentacaoPrevista.dataVencimento.getMonth()));
      } 
      this.carregarArrayMovPrevistas(this.nrTotalRecorrencias);
    }     
  }

  closeModal() {
    this.displayModal = false;
  }




  /*======EDIÇÃO DE LINHA==========*/
  onRowEditInit(movPrevista: MovimentacaoPrevista, ri: number) {
    this.arStDataVencimento[ri] = DateConvert.formatDateDDMMYYYY(movPrevista.dataVencimento, '/');
    this.arStValor[ri] = movPrevista.valor.toString();
    this.clonedMovPrevista[movPrevista.nrParcela] = { ...movPrevista };
  }

  onRowEditSave(movPrevista: MovimentacaoPrevista, ri: number) {
    //crítica do valor..
    if (!(Number.parseFloat(this.arStValor[ri]) > 0)) {
      this.alertMessageForm.showError("Valor Inválido");
      return false;
    }

    //crítica da data de vencimento..
    this.arStDate = this.arStDataVencimento[ri].split('/');

    if (Number.parseInt(this.arStDate[2]) != movPrevista.dataReferencia.getFullYear() ||
      (Number.parseInt(this.arStDate[1]) - 1) != movPrevista.dataReferencia.getMonth()) {
      this.alertMessageForm.showError("Data fora do mês/ano da recorrência");
      return false;
    }

    //sinaliza que ocorreu uma edição da recorrência de parcela, para mensagem interrogativa na tela de cadastro..
    this.dtDataVencimento = new Date(Number.parseInt(this.arStDate[2]), Number.parseInt(this.arStDate[1]) - 1, Number.parseInt(this.arStDate[0]));
    this.nrValor = Number.parseFloat(this.arStValor[ri]);

    if (DateConvert.formatDateDDMMYYYY(movPrevista.dataVencimento, '/') != DateConvert.formatDateDDMMYYYY(this.dtDataVencimento, '/') ||
      movPrevista.valor != this.nrValor) {
      this.criticaNovaParcela = true;
    }

    //setando o value de cada objeto..
    movPrevista.dataVencimento = new Date(Number.parseInt(this.arStDate[2]), Number.parseInt(this.arStDate[1]) - 1, Number.parseInt(this.arStDate[0]));
    movPrevista.valor = Number.parseFloat(this.arStValor[ri]);

    this.arFormasPagamento.filter(f => f.id == movPrevista.idFormaPagamento).map(f => {
      movPrevista.formaPagamento = f;
    });

    this.calcDiferenca(this.movimentacaoPrevista.valor);
    delete this.clonedMovPrevista[movPrevista.nrParcela];
  }

  onRowEditCancel(movPrevista: MovimentacaoPrevista, ri: number) {
    this.arMovPrevistas[ri] = this.clonedMovPrevista[movPrevista.nrParcela];
    delete this.clonedMovPrevista[movPrevista.nrParcela];
  }



  /*======GERAÇÃO DE RECORRÊNCIAS========*/
  calcDiferenca(valorTotal: number){
    this.nrTotalValorParcelado = 0;
    this.arMovPrevistas.forEach(element => { this.nrTotalValorParcelado += element.valor });
    this.nrDiferValorParcelado = Number(valorTotal) - Number(this.nrTotalValorParcelado.toFixed(2));
  }

  confirmarGeracaoParcelas() {
    if (this.criticaNovaParcela) {
      this.confirmationService.confirm({
        message: 'Ao adicionar novas parcelas, qualquer edição será desfeita. Deseja Continuar?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.criticaNovaParcela = false;
          this.carregarArrayMovPrevistas(this.nrTotalRecorrencias);
        },
        reject: () => {
          this.nrTotalRecorrencias = this.nrTotalRecorrenciasOld;
          return false;
        }
      });
    } else {
      this.carregarArrayMovPrevistas(this.nrTotalRecorrencias);
    }
  }

  carregarArrayMovPrevistas(nrTotal: number) {
    if ((this.movimentacaoPrevista.valor / nrTotal) < 1) {
      this.alertMessageForm.showError("Valor da parcela é menor do que R$1,00. Operação cancelada");
      return false;
    }

    this.arMovPrevistas.length = 0;
    this.nrTotalRecorrenciasOld = nrTotal;

    MovimentacaoPrevista.gerarRecorrencias(this.movimentacaoPrevista, this.nrTotalRecorrencias).subscribe(
      (movPrevistas) => {
        this.arMovPrevistas = movPrevistas;
        this.calcDiferenca(this.movimentacaoPrevista.valor);
        this.displayModal = true;
      });
  }


  /*=======MÉTODOS PARA CHAMADA DA API=======*/
  post(movPrevistas: MovimentacaoPrevista[]) {

    //carregando o array formGroup..
    this.arFormGroup.length=0;
    
    movPrevistas.forEach(element=>{
      this.arFormGroup.push(new FormBuilder().group({
        idItemMovimentacao: [element.itemMovimentacao.id],
        tipoPrioridade: [element.tipoPrioridade],
        observacao:[element.observacao],
        dataReferencia:[element.dataReferencia],
        dataVencimento:[element.dataVencimento],
        valor:[element.valor],
        idFormaPagamento:[element.idFormaPagamento],
        nrParcela:[element.nrParcela],
        nrParcelaTotal:[element.nrParcelaTotal]
      }));
    });
    

    this.movPrevistaService.postArray(this.arFormGroup).subscribe(
      sucess => { this.alertMessageForm.showSuccess(sucess.message) }/*,
      error => { this.actionForError(error); }*/
    );

  }
/*
  private actionForError(e) {
    if (e.status == 400) {
      //validações da API (BadRequest) 
      this.arvalidationErrors = e.error;
      this.displayError = true;
    }
  }
*/
  clearValidations() {
    this.arvalidationErrors = [];
    this.displayError = false;
  }
}