import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../_services/usuario-service';
import { environment } from 'src/environments/environment';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { Router } from '@angular/router';
import { BSUpdateUsuario } from 'src/app/core/services/bs-update-usuario';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bsAutenticarUsuario: BSAutenticarUsuario,
    private bsUpdateUsuario: BSUpdateUsuario) {
      this.bsAutenticarUsuario.set(false);
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
    debugger;
    this.usuarioService.autenthicate(this.formLogin.value).subscribe(
      (s: any) => {
        window.localStorage.setItem(environment.keyUser, JSON.stringify(s.user));

        //envio de eventos para o app-header..
        this.bsUpdateUsuario.setEmail(this.formLogin.value.eMail);
        this.bsAutenticarUsuario.set(true);

        this.router.navigate(['/receitas-despesas-dashboard']);
      });
      //mensagem de tratamento de erros centralizado no interception..
  }
}