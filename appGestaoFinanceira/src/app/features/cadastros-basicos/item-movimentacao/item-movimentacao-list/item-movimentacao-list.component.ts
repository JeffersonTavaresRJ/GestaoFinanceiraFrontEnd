import { Component, Injector, OnInit } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { ItemMovimentacao } from '../../_models/item-movimentacao-model';
import { ItemMovimentacaoService } from '../../_services/item-movimentacao-service';

@Component({
  selector: 'app-item-movimentacao-list',
  templateUrl: './item-movimentacao-list.component.html',
  styleUrls: ['./item-movimentacao-list.component.css']
})
export class ItemMovimentacaoListComponent extends GenericResourceListComponent<ItemMovimentacao> {

  constructor(protected injector: Injector, 
              private itemMovimentacaoService : ItemMovimentacaoService ) { 
    super(injector, itemMovimentacaoService )
  } 

}