import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { MovimentacaoRealizada } from '../../_models/mov-realizada-model.';
import { MovRealizadaService } from '../../_services/mov-realizada-service';

@Component({
  selector: 'app-mov-realizada-form-cadastro',
  templateUrl: './mov-realizada-form-cadastro.component.html',
  styleUrls: ['./mov-realizada-form-cadastro.component.css']
})
export class MovRealizadaFormCadastroComponent extends GenericResourceFormComponent<MovimentacaoRealizada> {

  constructor(protected injector: Injector,
    protected movRealizadaService: MovRealizadaService) {
    super(injector, new MovimentacaoRealizada, movRealizadaService, MovimentacaoRealizada.fromJson, null);
  }

  dataReferencia:Date;

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      id: [null],
      idCategoria:[null],
      idItemMovimentacao:[null],
      idConta:[null],
      idFormaPagamento:[null],
      dataMovimentacaoRealizada:[null],
      valor:[null]
    });    
  }

  protected resourceCreatePageTitle():string{
    return 'Novo Lançamento';
  }

  protected resourceEditPageTitle():string{
    return 'Edição do Lançamento';
  } 
}