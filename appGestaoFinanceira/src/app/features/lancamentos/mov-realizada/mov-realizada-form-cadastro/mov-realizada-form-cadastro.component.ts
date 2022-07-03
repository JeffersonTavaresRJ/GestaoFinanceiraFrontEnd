import { Component, Injector } from '@angular/core';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-form-cadastro',
  templateUrl: './mov-realizada-form-cadastro.component.html',
  styleUrls: ['./mov-realizada-form-cadastro.component.css']
})
export class MovRealizadaFormCadastroComponent extends GenericResourceFormComponent<MovimentacaoRealizada> {

  arStDate: string[];
  dataIni: Date;
  dataFim: Date;
  
  constructor(protected injector: Injector,
    protected movimentacaoRealizadaService: MovRealizadaService) {
    super(injector, movimentacaoRealizadaService, null);
  }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      id: [null],
      idCategoria:[null],
      idItemMovimentacao:[null],
      idConta:[null],
      idFormaPagamento:[null],
      tipoPrioridade:[null],
      observacao:[null],
      dataMovimentacaoRealizada:[null],
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

  protected loadResource() {
    if (this.resourceCurrentAction() == 'edit') {
      this.actResourceRoute.data.subscribe(
        (sucess: { resolveMovReal: MovimentacaoRealizada }) => {
          console.log(sucess);
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
        }
      );
    }
  }
}