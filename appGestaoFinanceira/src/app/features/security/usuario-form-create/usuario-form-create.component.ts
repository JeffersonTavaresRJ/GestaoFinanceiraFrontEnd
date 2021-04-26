import { Component, Injector } from '@angular/core';
import { Usuario } from '../_models/usuario-model'
import { GenericResourceFormComponent } from '../../../shared/components/generic-resource-form/generic-resource-form-component'
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
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
  }

  protected buildResourceForm() {
    this.resourceForm = this.resourceFormBuilder.group({
      nome: [null],
      eMail: [null],
      senha: [null],
      confirmarSenha: [null]
    },
      {
        validator: ValidacoesCustomizadas.validarConfirmacaoSenha
      });
  }  
}