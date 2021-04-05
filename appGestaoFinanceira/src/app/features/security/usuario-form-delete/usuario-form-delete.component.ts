import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { AlertMessageForm } from '../../../shared/components/alert-form/alert-message-form';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { AutenticarUsuarioService } from 'src/app/core/services/AutenticarUsuarioService';

@Component({
  selector: 'app-usuario-form-delete',
  templateUrl: './usuario-form-delete.component.html',
  styleUrls: ['./usuario-form-delete.component.css']
})
export class UsuarioFormDeleteComponent extends GenericResourceFormComponent<Usuario> {

  usuario: Usuario;
  validandoSenha: boolean;

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    protected alertMessage: AlertMessageForm,
    private autenticarUsuarioService: AutenticarUsuarioService) {
    super(injector, usuarioService, alertMessage, '/login');    
  }

  resourceSubmmit() {
    //passando um evento para ser executado caso a api seja executada com sucesso..
    this.resourceSubmmitEventForSuccess = () => this.autenticarUsuarioService.set(false);
    //alterando a api, que foi alterada na validação da senha no servidor..
    super.setResourceSubmmitApiName('api/Usuario');
    super.resourceSubmmit();
  }
 
  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.resourceForm = this.resourceFormBuilder.group({
      id: [this.usuario.id],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required]
    }, {
      validator: [ValidacoesCustomizadas.validarConfirmacaoSenha,
      ValidacoesCustomizadas.validarSenha(this.usuarioService, this.validandoSenha)]
    });
  }

  get validatorConfirmarSenha() {
    return this.resourceForm.get('confirmarSenha');
  }

}
