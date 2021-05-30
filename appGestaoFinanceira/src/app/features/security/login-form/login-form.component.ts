import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../_services/usuario-service';
import { environment } from 'src/environments/environment';
import { AutenticarUsuarioObservable } from 'src/app/core/services/autenticar-usuario-observable';
import { Router } from '@angular/router';
import { UpdateUsuarioObservable } from 'src/app/core/services/update-usuario-observable';


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
    private formBuilder: FormBuilder,
    private router: Router,
    private autenticarUsuarioObservable: AutenticarUsuarioObservable,
    private updateUsuarioObservable: UpdateUsuarioObservable) {
      this.autenticarUsuarioObservable.set(false);
  }

  ngOnInit(): void {
    this.buildForm();
    window.localStorage.removeItem(environment.keyUser);    
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      eMail: [null, Validators.compose([Validators.email, Validators.required])],
      senha: [null, Validators.required]
    });   

  }

  autenticar(): void {
    this.messageButton = 'Acessando...';
    debugger;
    this.usuarioService.autenthicate(this.formLogin.value).subscribe(
      (s: any) => {
        this.messageButton = null;
        window.localStorage.setItem(environment.keyUser, JSON.stringify(s.user));

        //envio de eventos para o app-header..
        this.updateUsuarioObservable.setEmail(this.formLogin.value.eMail);
        this.autenticarUsuarioObservable.set(true);

        this.router.navigate(['/receitas-despesas-dashboard']);
      },
      (e:any)=>{
         this.messageButton=null;
      });
      //mensagem de tratamento de erros centralizado no interception..
  }
}