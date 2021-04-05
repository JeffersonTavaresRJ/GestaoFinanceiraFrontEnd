import { Component, Injector } from '@angular/core';
import { Usuario } from '../../../shared/models/usuario-model'
import { GenericResourceFormComponent } from '../../../shared/components/generic-resource-form/generic-resource-form-component'
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent extends GenericResourceFormComponent<Usuario>{

  constructor(protected injector: Injector, 
              protected alertMessage: AlertMessageForm, 
              protected usuarioService: UsuarioService) {
    super(injector, usuarioService, alertMessage,'/login');
    this.setResourceSubmmitApiName('api/Usuario');
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

  //propriedade do formulário para pegar validações..
  get validatorConfirmarSenha() {
    return this.resourceForm.get('confirmarSenha');
  }
}