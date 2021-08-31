import { Component, Injector } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { Conta } from '../../_models/conta-model';
import { ContaService } from '../../_services/conta-service';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent extends GenericResourceListComponent<Conta> {
  paginaAtual:number=1;
  constructor(protected injector: Injector,
              private contaService: ContaService) {
    super(injector, contaService);
   } 

}