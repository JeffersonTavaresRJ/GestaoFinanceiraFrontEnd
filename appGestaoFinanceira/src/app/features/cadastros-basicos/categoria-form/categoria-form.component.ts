import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Categoria } from '../_models/categoria-model';
import { CategoriaService } from '../_services/categoria-service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends GenericResourceFormComponent<Categoria> {


  constructor(protected injector: Injector,
    protected categoriaService: CategoriaService) {
    super(injector, new Categoria, categoriaService, null);
  }

  tipos: any[] = [];

  ngOnInit(){
    this.categoriaService.listarTipos().subscribe(
      sucess => this.tipos = sucess,
      error => this.resourceAlertMessage.showError(error, 'Sr. Usuário')
    );
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      status: ['', Validators.required],
      idUsuario: [this.resourceUsuario.id]
    });    
  }

  protected resourceCreatePageTitle():string{
    return 'Cadastro de Categoria';
  }

  protected resourceEditPageTitle():string{
    return 'Edição de Categoria';
  }

}