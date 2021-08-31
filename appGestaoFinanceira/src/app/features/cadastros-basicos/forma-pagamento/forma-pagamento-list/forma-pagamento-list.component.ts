import { Component, Injector, OnInit } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { FormaPagamento } from '../../_models/forma-pagamento';
import { FormaPagamentoService } from '../../_services/forma-pagamento-service';

@Component({
  selector: 'app-forma-pagamento-list',
  templateUrl: './forma-pagamento-list.component.html',
  styleUrls: ['./forma-pagamento-list.component.css']
})
export class FormaPagamentoListComponent extends GenericResourceListComponent<FormaPagamento> {

  constructor(injector: Injector,
              formaPagamentoService: FormaPagamentoService) { 
    super(injector, formaPagamentoService)
  }  
}