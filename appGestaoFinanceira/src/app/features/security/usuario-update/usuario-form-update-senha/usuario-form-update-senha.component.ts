import { Component, Injector } from '@angular/core';
import { UpdateUsuarioObservable } from 'src/app/core/services/UpdateUsuarioObservable';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { ValidacoesCustomizadas } from '../../../../shared/validacoes-customizadas/validacoes-customizadas';
import { UsuarioTrocaSenha } from '../../_models/usuario-troca-senha-model';

@Component({
  selector: 'app-usuario-form-update-senha',
  templateUrl: './usuario-form-update-senha.component.html',
  styleUrls: ['./usuario-form-update-senha.component.css']
})
export class UsuarioFormUpdateSenhaComponent extends GenericResourceFormComponent<UsuarioTrocaSenha> {

  constructor(protected injector: Injector,
    protected usuarioService: UsuarioService,
    private updateUsuarioObservable: UpdateUsuarioObservable) {
    super(injector, new UsuarioTrocaSenha, usuarioService, UsuarioTrocaSenha.fromJson, '/login');    
  }

  protected buildResourceForm() {
    this.updateUsuarioObservable.getNome().subscribe(valor => this.resourceUsuario.nome = valor);
    this.updateUsuarioObservable.getEMail().subscribe(valor => this.resourceUsuario.eMail = valor);

    this.resourceForm = this.resourceFormBuilder.group({
      id: this.resourceUsuario.id,
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
      id: this.resourceUsuario.id,
      senhaAtual: null,
      senha: null,
      confirmarSenha: null
    });
    super.resourceActionForSucess();
  }
}