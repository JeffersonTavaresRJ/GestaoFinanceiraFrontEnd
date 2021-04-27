import { Component, Injector } from '@angular/core';
import { UpdateUsuarioObservable } from 'src/app/core/services/UpdateUsuarioObservable';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { environment } from 'src/environments/environment';
import { ValidacoesCustomizadas } from '../../../../shared/validacoes-customizadas/validacoes-customizadas';

@Component({
  selector: 'app-usuario-form-update-senha',
  templateUrl: './usuario-form-update-senha.component.html',
  styleUrls: ['./usuario-form-update-senha.component.css']
})
export class UsuarioFormUpdateSenhaComponent extends GenericResourceFormComponent<Usuario> {

  usuario: Usuario;

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    private updateUsuarioObservable: UpdateUsuarioObservable) {
    super(injector, usuarioService, '/login');    
  }

  protected buildResourceForm() {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.updateUsuarioObservable.getNome().subscribe(valor => this.usuario.nome = valor);
    this.updateUsuarioObservable.getEMail().subscribe(valor => this.usuario.eMail = valor);

    this.resourceForm = this.resourceFormBuilder.group({
      id: this.usuario.id,
      senhaAtual: [null],
      senha: [null],
      confirmarSenha: [null]
    },
      {
        validator: ValidacoesCustomizadas.validarConfirmacaoSenha
      });

  }

  resourceSubmmit(){
    super.setResourceApiOption('/TrocaSenha');
    super.resourceSubmmit();
  }

  resourceActionForSucess() {
    this.resourceForm.setValue({
      id: this.usuario.id,
      senhaAtual: null,
      senha: null,
      confirmarSenha: null
    });
    super.resourceActionForSucess();
  }
}