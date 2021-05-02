import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';

@Component({
  selector: 'app-usuario-form-delete',
  templateUrl: './usuario-form-delete.component.html',
  styleUrls: ['./usuario-form-delete.component.css']
})
export class UsuarioFormDeleteComponent extends GenericResourceFormComponent<Usuario> {

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService) {
    super(injector, new Usuario, usuarioService, Usuario.fromJson, '/login');       
  }

  protected buildResourceForm() {
   this.resourceForm = this.resourceFormBuilder.group({
      id: [this.resourceUsuario.id],
      eMail:[this.resourceUsuario.eMail],
      senha: [null, Validators.compose([Validators.required])],
      confirmarSenha: [null, Validators.compose([Validators.required])]
    }, {
      validator: [ValidacoesCustomizadas.validarConfirmacaoSenha,
      ValidacoesCustomizadas.validarSenha(this.usuarioService)]
    });
  }

  protected resourceDeletePageTitle():string{
    return 'Confirma a exclusão do usuário?';
  }
}