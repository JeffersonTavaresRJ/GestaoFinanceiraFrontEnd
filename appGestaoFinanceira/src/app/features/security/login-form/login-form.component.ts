import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario-resource-service';
import { AlertMessageForm } from '../../../shared/components/alert-form/alert-message-form';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formLogin: FormGroup;
  messageButton: string;


  constructor(
    private usuarioService: UsuarioService,
    private alertMessageForm: AlertMessageForm,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      EMail: [null, Validators.compose([Validators.email, Validators.required])],
      Senha: [null, Validators.required]
    });
  }

  get EMail() {
    return this.formLogin.get('EMail');
  }

  get Senha() {
    return this.formLogin.get('Senha');
  }

  autenticar(): void {
    this.messageButton = 'Acessando...';
   // debugger;
    this.usuarioService.autenthicate(this.formLogin.value).subscribe(
      (s: any) => {
        debugger;
        this.messageButton = null;
        window.localStorage.setItem(environment.keyUser, JSON.stringify(s.user));
        window.location.href = '/receitas-despesas-dashboard';
      },
      (e: any) => {
        this.messageButton = null;
        if (e.status == 0) {
          this.alertMessageForm.showError('Problema no acesso ao servidor', 'Sr. Usuário');
        }
        else if (e.status == 400) {
          this.alertMessageForm.showInfo(e.error.message, 'Sr. Usuário');
        } else {
          this.alertMessageForm.showError(e.error, 'Sr. Usuário');
          console.log('status: ' + e.status);

        }
      });
  }
}