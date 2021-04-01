import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import { ValidacoesCustomizadas } from '../../../shared/validacoes-customizadas/validacoes-customizadas';
import { AlertMessageForm } from '../../../shared/components/alert-form/alert-message-form';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuario-form-delete',
  templateUrl: './usuario-form-delete.component.html',
  styleUrls: ['./usuario-form-delete.component.css']
})
export class UsuarioFormDeleteComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private usuarioFormBuilder: FormBuilder,
    private alertMessage: AlertMessageForm) { }

  messageButton: string = null;
  usuarioFormDelete: FormGroup;
  usuario: Usuario;

  ngOnInit(): void {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));

    this.usuarioFormDelete = this.usuarioFormBuilder.group({
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required]
    }, {
      validator: ValidacoesCustomizadas.validarConfirmacaoSenha
    })
  }

  get validatorConfirmarSenha() {
    return this.usuarioFormDelete.get('confirmarSenha');
  }

  delete() {
    this.messageButton = 'Excluindo...';
    debugger;
    this.usuarioService.deleteUsuario(this.usuario.id, 
                                      this.usuario.eMail, 
                                      this.usuarioFormDelete.value.senha).subscribe(
      (s:any) => {
        this.messageButton =null;
        this.alertMessage.showSuccess('Usuário excluído com sucesso!', 'Sr. Usuário');
        window.localStorage.removeItem(environment.keyUser);
        window.location.href='/login';
      },
      (e:any)=>{        
        this.messageButton =null;
        if(e.status==401){
          this.alertMessage.showError('Acesso não autorizado', 'Sr. Usuário');
        }else if (e.status == 400) {
          this.alertMessage.showInfo(e.error.message, 'Sr. Usuário');
        }else{
          this.alertMessage.showError(e.error, 'Sr. Usuário');
        }
      }
    );
  }

}
