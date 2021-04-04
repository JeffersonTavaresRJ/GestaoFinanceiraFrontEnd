import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { AlertMessageForm } from '../../../shared/components/alert-form/alert-message-form';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';

@Component({
  selector: 'app-usuario-form-delete',
  templateUrl: './usuario-form-delete.component.html',
  styleUrls: ['./usuario-form-delete.component.css']
})
export class UsuarioFormDeleteComponent extends GenericResourceFormComponent<Usuario> {

  private _usuarioService : UsuarioService;
  
  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    protected alertMessage: AlertMessageForm) {         
    super(injector, usuarioService, alertMessage, '/login');
    this._usuarioService = usuarioService; 
  }

  usuario: Usuario;

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.resourceForm = this.resourceFormBuilder.group({
      id:[this.usuario.id],
      email:[this.usuario.eMail],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required]
    },{
      validator: [ValidacoesCustomizadas.validarConfirmacaoSenha,
        ValidacoesCustomizadas.validarSenha(this.usuarioService)]
    });
  }

  get validatorConfirmarSenha() {
    return this.resourceForm.get('confirmarSenha');
  }  

}
