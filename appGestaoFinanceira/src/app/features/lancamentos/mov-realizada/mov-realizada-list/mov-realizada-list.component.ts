import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { DateConvert } from 'src/app/shared/functions/date-convert';
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

  constructor(private actResourceRoute: ActivatedRoute,
    private movRealizadaService: MovRealizadaService,
    private alertMessageForm: AlertMessageForm,
    protected formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      idConta: [1],
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
    debugger;
    this.dataFim = new Date(this.dataIni.getFullYear(),
      this.dataIni.getMonth() + 1,
      0);

    this.movRealizadaService.GetGroupBySaldoDiario(DateConvert.formatDateYYYYMMDD(this.dataIni.toString(), '-'),
      DateConvert.formatDateYYYYMMDD(this.dataFim.toString(), '-')).subscribe(
        (sucess: any[]) => {
          this.results = sucess;
          this.resultsAux = this.results;
        });
  }

  getConta(_ev: Conta) {
    this.results = this.resultsAux.filter(x => x.conta.id === this.formGroup.get("idConta").value);
  }

  filtrarTablePorParametros(event?: any) {
    debugger;
    this.results = this.resultsAux;
    var idConta = this.formGroup.get('idConta').value;

    if (idConta != null) {
      this.results = this.resultsAux.filter(m => m.conta.id == idConta);
    }
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
}