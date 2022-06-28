import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-list',
  templateUrl: './mov-realizada-list.component.html',
  styleUrls: ['./mov-realizada-list.component.css']
})
export class MovRealizadaListComponent implements OnInit {

  results: any[];
  resultsAux: any[];
  formGroup: FormGroup;

  dataReferencia: Date;
  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  idMovimentacaoRealizada: number;
  valorTotalReceita: number = 0;
  valorTotalDespesa: number = 0;

  constructor(private actResourceRoute: ActivatedRoute,
    private movRealizadaService: MovRealizadaService,
    private alertMessageForm: AlertMessageForm,
    protected formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      idConta: [1],
      idItemMovimentacao: [null]
    });
  }

  ngOnInit(): void {
    this.movRealizadaList();
  }

  private movRealizadaList() {
    debugger;
    this.arStDate = this.actResourceRoute.snapshot.params.dataRealIni.split('-');

    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.dataReferencia = this.dataIni;

    this.arStDate = this.actResourceRoute.snapshot.params.dataRealFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: any[] }) => {
        this.results = sucess.resolveMovReal;
        this.resultsAux = this.results;
      }
    );
  }

  filtrarTablePorPeriodo() {
    this.dataFim = new Date(this.dataFim.getFullYear(),
      this.dataFim.getMonth() + 1,
      0);

    if (this.dataFim < this.dataIni) {
      this.alertMessageForm.showError("O período informado possui o mês/ano inicial maior do que o mês/ano final", "Sr. Usuário");
      return false;
    }

    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(this.dataIni.toString(), '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim.toString(), '-')).subscribe(
        (sucess: any[]) => {
          this.results = sucess;
          this.resultsAux = this.results;
          this.calcularSaldo();
        });
  }

  getConta(_ev: Conta) {
    // this.formGroup.get("idConta").setValue(_ev.id);
    this.results = this.resultsAux.filter(x => x.conta.id === this.formGroup.get("idConta").value);
  }

  filtrarTablePorParametros(event?: any) {
    this.results = this.resultsAux;
    var idCategoria = this.formGroup.get('idCategoria').value;
    var idItemMovimentacao = this.formGroup.get('idItemMovimentacao').value;
    var idConta = this.formGroup.get('idConta').value;

    if (idCategoria != null) {
      this.results = this.resultsAux.filter(m => m.itemMovimentacao.categoria.id == idCategoria);
    }
    if (idItemMovimentacao != null) {
      this.results = this.resultsAux.filter(m => m.itemMovimentacao.id == idItemMovimentacao);
    }
    if (idConta != null) {
      this.results = this.resultsAux.filter(m => m.conta.id == idConta);
    }
    this.calcularSaldo();
  }

  modalDeleteMessage(_idMovimentacaoRealizada: number) {
    this.idMovimentacaoRealizada = _idMovimentacaoRealizada;
  }

  eventDelete(event) {
    if (event) {
      this.movRealizadaService.deleteById(this.idMovimentacaoRealizada)
        .subscribe(sucess => {
          this.alertMessageForm.showSuccess(sucess.message, 'Sr. Usuário');
          this.filtrarTablePorPeriodo()
        });
    }
  }

  private calcularSaldo() {
    this.valorTotalDespesa = 0;
    this.valorTotalReceita = 0;
    this.results.forEach((element: MovimentacaoRealizada) => {
      if (element.itemMovimentacao.tipo == "D") {
        this.valorTotalDespesa += element.valor;
      } else {
        this.valorTotalReceita += element.valor;
      }
    });
  }
  /*
  GroupByDataMovimentacaoRealizada(arMovRealizada: MovimentacaoRealizada[]): any[]
  {
    debugger;
    arMovRealizada.sort(function(a,b){return (((new Date(b.dataMovimentacaoRealizada).getFullYear()*10000)+(new Date(b.dataMovimentacaoRealizada).getMonth()*100)+(new Date(b.dataMovimentacaoRealizada).getDate()))-
                                              ((new Date(a.dataMovimentacaoRealizada).getFullYear()*10000)+(new Date(a.dataMovimentacaoRealizada).getMonth()*100)+(new Date(a.dataMovimentacaoRealizada).getDate())));
  }); 
    var groups = new Set(arMovRealizada.map(item => item.dataMovimentacaoRealizada)), 
    resultGroup = [];
    groups.forEach(g => 
      resultGroup.push(
              {
                dataMovimentacaoRealizada: g, 
                values: arMovRealizada.filter(i => i.dataMovimentacaoRealizada === g)
              })
           );
    return resultGroup;
  }
  */
}