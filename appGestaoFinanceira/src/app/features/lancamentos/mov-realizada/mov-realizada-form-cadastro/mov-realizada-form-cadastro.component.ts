import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';
import { DateConvert } from 'src/app/shared/functions/date-convert';

@Component({
  selector: 'app-mov-realizada-form-cadastro',
  templateUrl: './mov-realizada-form-cadastro.component.html',
  styleUrls: ['./mov-realizada-form-cadastro.component.css']
})
export class MovRealizadaFormCadastroComponent extends GenericResourceFormComponent<MovimentacaoRealizada> {

  arStDate: string[];
  dataIni: Date;
  dataFim: Date;

  descricaoCategoria: string;
  descricaoItemMovimentacao:string;
  descricaoPrioridade:string;
  descricaoFormaPagamento: string;
  descricaoConta:string;

  saldoConta: number;
  
  constructor(protected injector: Injector,
    protected movimentacaoRealizadaService: MovRealizadaService) {
    super(injector, movimentacaoRealizadaService, null);
  }


  public getSaldoConta(dataFim?:Date){
    debugger;
    var idConta = this.resourceForm.get('idConta').value;
    var dataReferencia = null;

    if (dataFim != null){
      dataReferencia = dataFim;
    }else{
      dataReferencia = DateConvert.stringToDate(this.resourceForm.get('dataMovimentacaoRealizada').value, '-');
      dataReferencia = new Date(dataReferencia.getFullYear(), dataReferencia.getMonth()+1, 0);
    }
    
    this.movimentacaoRealizadaService.GetSaldoConta(idConta, DateConvert.formatDateYYYYMMDD(dataReferencia,'-'))
                                     .subscribe( (success:number)=>{this.saldoConta = success});
    }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      id: [null],
      idCategoria:[null],
      idItemMovimentacao:[null, Validators.required],
      idConta:[null, Validators.required],
      idFormaPagamento:[null, Validators.required],
      tipoPrioridade:[null, Validators.required],
      observacao:[null],
      dataMovimentacaoRealizada:[null, Validators.required],
      valor:[null]
    });   
    

    this.arStDate = this.actResourceRoute.snapshot.params.dataRealIni.split('-');
    this.dataIni = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
    this.arStDate = this.actResourceRoute.snapshot.params.dataRealFim.split('-');
    this.dataFim = new Date(this.arStDate[1] + '-' + this.arStDate[2] + '-' + this.arStDate[0]);
 }

  protected resourceCreatePageTitle():string{
    return 'Novo Lançamento';
  }

  protected resourceEditPageTitle():string{
    return 'Edição do Lançamento';
  } 

  protected resourceDetalhePageTitle(): string {
    return 'Detalhe Lançamento';
  }

  protected loadResource() {
    if (this.resourceCurrentAction() == 'new'){
      var idConta = Number.parseInt(this.actResourceRoute.snapshot.params.idConta);
      this.resourceForm.get('idConta').setValue(idConta);      
      this.getSaldoConta(this.dataFim);
    }

    if (this.resourceCurrentAction() == 'edit' || this.resourceCurrentAction() == 'cons') {
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveMovReal: MovimentacaoRealizada }) => {
          //console.log(sucess);
          //o resolveMovReal deve ser o mesmo nome na variável resolve da rota.. 
          this.resourceForm.get('id').setValue(sucess.resolveMovReal.id);
          this.resourceForm.get('idCategoria').setValue(sucess.resolveMovReal.itemMovimentacao.categoria.id);
          this.resourceForm.get('idItemMovimentacao').setValue(sucess.resolveMovReal.itemMovimentacao.id);
          this.resourceForm.get('dataMovimentacaoRealizada').setValue(new Date(sucess.resolveMovReal.dataMovimentacaoRealizada));
          this.resourceForm.get('tipoPrioridade').setValue(sucess.resolveMovReal.tipoPrioridade);
          this.resourceForm.get('observacao').setValue(sucess.resolveMovReal.observacao);
          this.resourceForm.get('valor').setValue(sucess.resolveMovReal.valor);
          this.resourceForm.get('idConta').setValue(sucess.resolveMovReal.conta.id);
          this.resourceForm.get('idFormaPagamento').setValue(sucess.resolveMovReal.formaPagamento.id);

          this.descricaoCategoria = sucess.resolveMovReal.itemMovimentacao.categoria.descricao;
          this.descricaoItemMovimentacao = sucess.resolveMovReal.itemMovimentacao.descricao;
          this.descricaoPrioridade = sucess.resolveMovReal.tipoPrioridadeDescricao;
          this.descricaoFormaPagamento = sucess.resolveMovReal.formaPagamento.descricao;
          this.descricaoConta = sucess.resolveMovReal.conta.descricao;

          this.getSaldoConta()
          //debugger;
        }
      );
    }
  }
}