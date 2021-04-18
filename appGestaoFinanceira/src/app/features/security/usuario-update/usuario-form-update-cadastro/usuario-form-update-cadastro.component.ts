import { Component, Injector } from '@angular/core';
import { UpdateUsuarioObservable } from 'src/app/core/services/UpdateUsuarioObservable';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { ValidacoesCustomizadas } from 'src/app/shared/validacoes-customizadas/validacoes-customizadas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-form-update-cadastro',
  templateUrl: './usuario-form-update-cadastro.component.html',
  styleUrls: ['./usuario-form-update-cadastro.component.css']
})
export class UsuarioFormUpdateCadastroComponent extends GenericResourceFormComponent<Usuario> {

  usuario: Usuario;

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    private updateUsuarioObservable : UpdateUsuarioObservable) {
    super(injector, usuarioService, null);
    //evento que será executado caso ocorra sucesso..
    this.resourceSubmmitEventForSuccess = ()=>this.updateKeyUser();
   }

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.resourceForm = this.resourceFormBuilder.group({
      id: this.usuario.id,
      nome: this.usuario.nome,
      email: this.usuario.eMail,
      senha: [null],
      confirmarSenha: [null]
    },
      {
        validator: ValidacoesCustomizadas.validarConfirmacaoSenha
      });

  }

  resourceSubmmit(){
    //alterando a api, que pode ser alterada por qq outra tela de usuário..
    super.setResourceSubmmitApiName('api/Usuario');    
    super.resourceSubmmit();
  }

  updateKeyUser(){
    this.usuario= JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.usuario.nome = this.resourceForm.value.nome;
    this.usuario.eMail = this.resourceForm.value.email;    
    this.updateUsuarioObservable.setNome(this.usuario.nome);
    this.updateUsuarioObservable.setEmail(this.usuario.eMail);
    window.localStorage.setItem(environment.keyUser, JSON.stringify(this.usuario));
  }
  
}
