import { Component, Injector } from '@angular/core';
import { Usuario } from '../../../shared/models/usuario-model'
import { GenericResourceFormComponent } from '../../../shared/components/generic-resource-form/generic-resource-form-component'
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
//import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';

@Component({
  selector: 'app-usuario-form-create',
  templateUrl: './usuario-form-create.component.html',
  styleUrls: ['./usuario-form-create.component.css']
})
export class UsuarioFormCreateComponent extends GenericResourceFormComponent<Usuario>{

  constructor(protected injector: Injector, 
              protected usuarioService: UsuarioService) {
    super(injector, usuarioService, '/login');
    this.setResourceSubmmitApiName('api/Usuario');
  }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      nome: [null],
      email: [null],
      senha: [null],
      confirmarSenha: [null]
    },
      {
        validator: ValidacoesCustomizadas.validarConfirmacaoSenha
      });
  }  
}