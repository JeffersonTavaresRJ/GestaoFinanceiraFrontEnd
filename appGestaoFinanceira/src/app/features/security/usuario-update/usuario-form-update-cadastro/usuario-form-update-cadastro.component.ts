import { Component, Injector } from '@angular/core';
import { UpdateUsuarioObservable } from 'src/app/core/services/UpdateUsuarioObservable';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { ValidacoesCustomizadas } from 'src/app/shared/validacoes-customizadas/validacoes-customizadas';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-form-update-cadastro',
  templateUrl: './usuario-form-update-cadastro.component.html',
  styleUrls: ['./usuario-form-update-cadastro.component.css']
})
export class UsuarioFormUpdateCadastroComponent extends GenericResourceFormComponent<Usuario> {

  usuario: Usuario;

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    private updateUsuarioObservable: UpdateUsuarioObservable) {
    super(injector, usuarioService, null);
  }

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.resourceForm = this.resourceFormBuilder.group({
      id: this.usuario.id,
      nome: this.usuario.nome,
      eMail: this.usuario.eMail,
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required]
    },
      {
        validator: ValidacoesCustomizadas.validarConfirmacaoSenha
      });

  }

  resourceSubmmit() {
    //alterando a api, que pode ser alterada por qq outra tela de usuário..
    super.setResourceSubmmitApiName('api/Usuario');
    super.resourceSubmmit();
  }

  resourceActionForSucess() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.usuario.nome = this.resourceForm.value.nome;
    this.usuario.eMail = this.resourceForm.value.eMail;
    this.updateUsuarioObservable.setNome(this.usuario.nome);
    this.updateUsuarioObservable.setEmail(this.usuario.eMail);

    window.localStorage.setItem(environment.keyUser, JSON.stringify(this.usuario));

    this.resourceForm.setValue({
      id: this.usuario.id,
      nome: this.usuario.nome,
      eMail: this.usuario.eMail,
      senha: null,
      confirmarSenha: null
    });

    super.resourceActionForSucess();

  }

}
