import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AlertMessageForm } from 'src/app/shared/components/alert-form/alert-message-form';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { ValidacoesCustomizadas } from 'src/app/shared/validacoes-customizadas/validacoes-customizadas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-form-update',
  templateUrl: './usuario-form-update.component.html',
  styleUrls: ['./usuario-form-update.component.css']
})
export class UsuarioFormUpdateComponent extends GenericResourceFormComponent<Usuario> {
  
  usuario:Usuario;
  validandoSenha:boolean;

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    protected alertMessage: AlertMessageForm) {
    super(injector, usuarioService, alertMessage, null);
  }

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.resourceForm = this.resourceFormBuilder.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.eMail, Validators.required],
      senhaAtual: [null, Validators.required],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required]
    }, {
      validator: ValidacoesCustomizadas.validarConfirmacaoSenha
    });
  }

  get validatorConfirmarSenha() {
    return this.resourceForm.get('confirmarSenha');
  } 


}
