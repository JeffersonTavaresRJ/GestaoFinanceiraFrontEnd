import { Component, Injector } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { CategoriaService } from '../_services/categoria-service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent extends GenericResourceListComponent<Categoria> {
  
  modalInterrogativeMessage:string;
  
  constructor(protected injector: Injector, protected categoriaService: CategoriaService) {    
    super(injector, categoriaService);
    categoriaService.setApiName('api/Categoria/GetAll');
  }

  resultEventExclusao(event: any) {
    //alert(event);
  }

  modalMessage(descricao: string){
    this.modalInterrogativeMessage = `${'Confirma a exclusão da categoria '}${descricao.bold()}${'?'}`;
  }
  
}
