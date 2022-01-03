import { Component } from '@angular/core';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { CategoriaService } from 'src/app/features/cadastros-basicos/_services/categoria-service';
import { GenericResourceDropDownComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-component';

@Component({
  selector: 'app-dropdown-categoria',
  templateUrl: './drpd-categoria.component.html',
  styleUrls: ['./drpd-categoria.component.css']
})
export class DropDownCategoriaComponent extends GenericResourceDropDownComponent<Categoria> {
  
  constructor(protected categoriaService: CategoriaService) { 
    super(categoriaService);
  }
}