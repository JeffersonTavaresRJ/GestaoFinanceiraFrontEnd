import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { enumModel } from 'src/app/shared/_models/generic-enum-model';
import { MovimentacaoPrevista } from '../../_models/mov-prevista-model';
import { MovPrevistaService } from '../../_services/mov-prevista-service';
import { environment } from 'src/environments/environment';

interface ParamListMovPre{
  idCategoria?: number, 
  idItemMovimentacao?: number, 
  idFormaPagamento?: number,
  idPrioridade?: string,
  status?: string,
  dataIni: string,
  dataFim: string};

@Component({
  selector: 'app-mov-prevista-list',
  templateUrl: './mov-prevista-list.component.html',
  styleUrls: ['./mov-prevista-list.component.css']
})
export class MovPrevistaListComponent implements OnInit {

  actResourceRoute: ActivatedRoute;
  movPrevistaService: MovPrevistaService;
  alertMessageForm: AlertMessageForm;
  formGroup: FormGroup;
  formBuilder: FormBuilder;

  arStDate: string[];
  status?: string;
  dataIni: Date;
  dataFim: Date;
  index: number;
  idItemMovimentacao: number;
  valorTotalReceita: number = 0;
  valorTotalDespesa: number = 0;
  dataReferencia: Date;
  displayDetalhe: boolean;
  paramListMovPre: ParamListMovPre;


  arEnumStatus: enumModel[];
  arMovPrevistas: MovimentacaoPrevista[];
  arMovPrevistasAux: MovimentacaoPrevista[];
  detalheMovimentacaoPrevista: MovimentacaoPrevista = new MovimentacaoPrevista();

  constructor(protected injector: Injector) {
    this.actResourceRoute = injector.get(ActivatedRoute);
    this.movPrevistaService = injector.get(MovPrevistaService);
    this.alertMessageForm = injector.get(AlertMessageForm);
    this.formBuilder = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.carregaParametros();
    this.builderForm();
    this.movPrevistaList();
  }

  filtrarTablePorPeriodo() {
    this.dataFim = new Date(this.dataFim.getFullYear(),
      this.dataFim.getMonth() + 1,
      0);
    if (this.dataFim < this.dataIni) {
      this.alertMessageForm.showError("O período informado possui o mês/ano inicial maior do que o mês/ano final");
      return false;
    }
    this.movPrevistaService.getByDataVencimento(DateConvert.formatDateYYYYMMDD(this.dataIni, '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim, '-'))
      .subscribe(result => {
        this.arMovPrevistas = result;
        this.arMovPrevistasAux = result;
        this.filtrarTablePorParametros();
        this.calcularSaldo();
      });
  }

  filtrarTablePorParametros(event?: any) {
    this.arMovPrevistas = this.arMovPrevistasAux;
    var idCategoria = this.formGroup.get('idCategoria').value;
    var idItemMovimentacao = this.formGroup.get('idItemMovimentacao').value;
    var idFormaPagamento = this.formGroup.get('idFormaPagamento').value;
    var idPrioridade = this.formGroup.get('idPrioridade').value;
    
    //armazenando parâmetros da última consulta..
    var param : ParamListMovPre={
       idCategoria: idCategoria, 
       idItemMovimentacao: idItemMovimentacao, 
       idFormaPagamento: idFormaPagamento,
       idPrioridade: idPrioridade,
       status: this.status,
       dataIni: DateConvert.formatDateYYYYMMDD(this.dataIni, '-'),
       dataFim: DateConvert.formatDateYYYYMMDD(this.dataFim, '-')};

    window.localStorage.setItem(environment.keyParamListMovPre, JSON.stringify(param));

    if (idCategoria != null) {
      this.arMovPrevistas = this.arMovPrevistasAux.filter(m => m.itemMovimentacao.categoria.id == idCategoria);
    }
    if (idItemMovimentacao != null) {
      this.arMovPrevistas = this.arMovPrevistasAux.filter(m => m.itemMovimentacao.id == idItemMovimentacao);
    }
    if (idFormaPagamento != null) {
      this.arMovPrevistas = this.arMovPrevistasAux.filter(m => m.formaPagamento.id == idFormaPagamento);
    }
    if (idPrioridade != null) {
      this.arMovPrevistas = this.arMovPrevistasAux.filter(m => m.tipoPrioridade == idPrioridade);
    }
    if (this.status != null) {
      this.arMovPrevistas = this.arMovPrevistasAux.filter(m => m.status == this.status);
    }
    this.calcularSaldo();
  }

  modalDeleteMessage(_idItemMovimentacao: number, _dataReferencia: Date) {
    this.idItemMovimentacao = _idItemMovimentacao;
    this.dataReferencia = _dataReferencia;
  }

  modalDetalhe(movimentacaoPrevista: MovimentacaoPrevista){
    this.displayDetalhe = true;
    this.detalheMovimentacaoPrevista = movimentacaoPrevista;
 }

  eventDelete(event) {
    if (event) {
      this.movPrevistaService.delete(this.idItemMovimentacao, DateConvert.formatDateYYYYMMDD(this.dataReferencia, '-'))
        .subscribe(sucess => {
          this.alertMessageForm.showSuccess(sucess.message);
          this.filtrarTablePorPeriodo()
        });
    }
  }  

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      idCategoria: [null],
      idItemMovimentacao: [null],
      idFormaPagamento: [null],
      idPrioridade: [null]
    });
  }

  private movPrevistaList() {

    //pegando os parâmetros da última consulta..
    var param = window.localStorage.getItem(environment.keyParamListMovPre);

    if(param!= null){
       this.paramListMovPre = JSON.parse(param);

       if(this.paramListMovPre.idCategoria!=null){
        this.formGroup.get('idCategoria').setValue(this.paramListMovPre.idCategoria);
       }

       if(this.paramListMovPre.idItemMovimentacao!=null){
        this.formGroup.get('idItemMovimentacao').setValue(this.paramListMovPre.idItemMovimentacao);
       }

       if(this.paramListMovPre.idFormaPagamento!=null){
        this.formGroup.get('idFormaPagamento').setValue(this.paramListMovPre.idFormaPagamento);
       }

       if(this.paramListMovPre.idPrioridade!=null){
        this.formGroup.get('idPrioridade').setValue(this.paramListMovPre.idPrioridade);
       }

       this.status = this.paramListMovPre.status;
       this.dataIni = DateConvert.stringToDate(this.paramListMovPre.dataIni, '-');
       this.dataFim = DateConvert.stringToDate(this.paramListMovPre.dataFim, '-');

       this.filtrarTablePorPeriodo();
       this.filtrarTablePorParametros();

    }else{
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveResources: MovimentacaoPrevista[] }) => {
          //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
          this.arMovPrevistas = sucess.resolveResources;
          this.arMovPrevistasAux = sucess.resolveResources;
          this.calcularSaldo();
        }
      );
    }


  }

  private calcularSaldo() {
    this.valorTotalDespesa = 0;
    this.valorTotalReceita = 0;
    this.arMovPrevistas.forEach((element: MovimentacaoPrevista) => {
      if (element.itemMovimentacao.tipo == "D") {
        this.valorTotalDespesa += element.valor;
      } else {
        this.valorTotalReceita += element.valor;
      }
    });

    //ordenação no formato YYYYMMDD..
    this.arMovPrevistas.sort(function (a, b) {
      return (
        ((new Date(a.dataVencimento.toString()).getFullYear() * 10000) + (new Date(a.dataVencimento.toString()).getMonth() * 100) + new Date(a.dataVencimento.toString()).getDate()) -
        ((new Date(b.dataVencimento.toString()).getFullYear() * 10000) + (new Date(b.dataVencimento.toString()).getMonth() * 100) + new Date(b.dataVencimento.toString()).getDate())
      )
    });

  }

  private carregaParametros() {
    this.arStDate = this.actResourceRoute.snapshot.params.dataIni.split('-');
    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.arStDate = this.actResourceRoute.snapshot.params.dataFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);

    this.movPrevistaService.GetAllStatus().subscribe(
      result => this.arEnumStatus = result
    );
  }
}