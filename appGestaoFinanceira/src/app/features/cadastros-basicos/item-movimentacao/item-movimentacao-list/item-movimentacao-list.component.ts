import { Component, Injector } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { ItemMovimentacao } from '../../_models/item-movimentacao-model';
import { ItemMovimentacaoService } from '../../_services/item-movimentacao-service';

@Component({
  selector: 'app-item-movimentacao-list',
  templateUrl: './item-movimentacao-list.component.html',
  styleUrls: ['./item-movimentacao-list.component.css']
})
export class ItemMovimentacaoListComponent extends GenericResourceListComponent<ItemMovimentacao> {
  resourcesAux: any[] = [];

  constructor(protected injector: Injector, 
              private itemMovimentacaoService : ItemMovimentacaoService ) { 
    super(injector, itemMovimentacaoService )
    this.builderForm();
  } 

  private builderForm() {
    this.formGroup = this.formBuilder.group({
      idCategoria: [null],
      descricao: ['']
    });
  };

  filtroOnInit(){
    this.resources = this.resources.filter(i=>i.tipoOperacao=="MD");
    this.resourcesAux = this.resources;
  };

  filtroPorCategoria(){
    var idCategoria = this.formGroup.get('idCategoria').value;
    if(idCategoria > 0){
        this.resources = this.resourcesAux.filter(i=>i.categoria.id == idCategoria);
    }else{
      this.resources = this.resourcesAux;
    }    
  }

  filtroPorItemMovimentacao(){

    var descricao = this.formGroup.get('descricao').value;

    if(descricao.trim().length > 0){        
        this.resources = this.resourcesAux.filter(i=>i.descricao.toLowerCase().includes(descricao.toLowerCase()));
    }else{
      this.resources = this.resourcesAux;
    } 
  }


}