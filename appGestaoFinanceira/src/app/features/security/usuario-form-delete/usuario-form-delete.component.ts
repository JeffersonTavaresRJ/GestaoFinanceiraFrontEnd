import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
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

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.resourceForm = this.resourceFormBuilder.group({
      id: [this.usuario.id],
      eMail:[this.usuario.eMail],
      senha: [null, Validators.compose([Validators.required])],
      confirmarSenha: [null, Validators.compose([Validators.required])]
    }, {
      validator: [ValidacoesCustomizadas.validarConfirmacaoSenha,
      ValidacoesCustomizadas.validarSenha(this.usuarioService)]
    });
  }
}