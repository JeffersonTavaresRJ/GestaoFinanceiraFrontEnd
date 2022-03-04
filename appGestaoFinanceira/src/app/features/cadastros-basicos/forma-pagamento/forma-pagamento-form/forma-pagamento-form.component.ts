import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { FormaPagamento } from '../../_models/forma-pagamento';
import { FormaPagamentoService } from '../../_services/forma-pagamento-service';

@Component({
  selector: 'app-forma-pagamento-form',
  templateUrl: './forma-pagamento-form.component.html',
  styleUrls: ['./forma-pagamento-form.component.css']
})
export class FormaPagamentoFormComponent extends GenericResourceFormComponent<FormaPagamento> {
  
  constructor(injector: Injector,
              formaPagamentoService: FormaPagamentoService){
    super(injector, new FormaPagamento(), formaPagamentoService, FormaPagamento.fromJson, '/forma-pagamento');
  }
  
  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group(
      {
        id: [null],
        descricao: [null,Validators.required],
        status: [null]
      })
  }
  protected resourceCreatePageTitle():string{
    return 'Cadastro de Forma de Pagamento';
  }

  protected resourceEditPageTitle():string{
    return 'Edição de Forma de Pagamento';
  }

  

}