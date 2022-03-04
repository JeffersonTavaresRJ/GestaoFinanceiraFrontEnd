import { Component } from '@angular/core';
import { Conta } from 'src/app/features/cadastros-basicos/_models/conta-model';
import { ContaService } from 'src/app/features/cadastros-basicos/_services/conta-service';
import { GenericResourceDropDownComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-component';

@Component({
  selector: 'app-dropdown-conta',
  templateUrl: './drpd-conta.component.html',
  styleUrls: ['./drpd-conta.component.css']
})
export class DropDownContaComponent extends GenericResourceDropDownComponent<Conta> {
  constructor(contaService: ContaService) {
    super(contaService);
  }
}
