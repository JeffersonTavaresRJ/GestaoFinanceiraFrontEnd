import { Component } from '@angular/core';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { FormaPagamentoService } from 'src/app/features/cadastros-basicos/_services/forma-pagamento-service';
import { GenericResourceDropDownComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-component';

@Component({
  selector: 'app-dropdown-forma-pagamento',
  templateUrl: './drpd-forma-pagamento.component.html',
  styleUrls: ['./drpd-forma-pagamento.component.css']
})
export class DropDownFormaPagamentoComponent extends GenericResourceDropDownComponent<FormaPagamento> {

  constructor(protected formaPagamentoService: FormaPagamentoService) { 
   super(formaPagamentoService);
  }
}