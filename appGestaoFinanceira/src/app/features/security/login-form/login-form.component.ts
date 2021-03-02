import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  mensagem:string;
  disabled:boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  autenticar(formLogin):void{
    console.log(formLogin.value);
    this.mensagem = "Processando..."; 
    this.disabled = true;
  }

}
