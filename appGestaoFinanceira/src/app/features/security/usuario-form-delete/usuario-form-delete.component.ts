import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';

@Component({
  selector: 'app-usuario-form-delete',
  templateUrl: './usuario-form-delete.component.html',
  styleUrls: ['./usuario-form-delete.component.css']
})
export class UsuarioFormDeleteComponent extends GenericResourceFormComponent<Usuario> {

  usuario: Usuario;
  
  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService) {
    super(injector, usuarioService, '/login');       
  }

  resourceSubmmit() {
    //alterando a api, que foi alterada na validação da senha no servidor..
    super.setResourceSubmmitApiName('api/Usuario');    
    super.resourceSubmmit();
  }

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.resourceForm = this.resourceFormBuilder.group({
      id: [this.usuario.id],
      email:[this.usuario.eMail],
      senha: [null, Validators.compose([Validators.required])],
      confirmarSenha: [null, Validators.compose([Validators.required])]
    }, {
      validator: [ValidacoesCustomizadas.validarConfirmacaoSenha,
      ValidacoesCustomizadas.validarSenha(this.usuarioService)]
    });
  }
}