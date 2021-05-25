import { Component, OnInit } from '@angular/core';
import { AutenticarUsuarioObservable } from 'src/app/core/services/AutenticarUsuarioObservable';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { environment } from 'src/environments/environment';
import { UpdateUsuarioObservable } from 'src/app/core/services/UpdateUsuarioObservable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private autenticarUsuarioObservable: AutenticarUsuarioObservable,
    private updateUsuarioObservable: UpdateUsuarioObservable,
    private router: Router) { }

  usuarioAutenticado: boolean;
  user: Usuario;
  user_name: string;

  ngOnInit(): void {
    this.autenticarUsuarioObservable.get().subscribe(valor => this.usuarioAutenticado = valor);
    if (!this.usuarioAutenticado){
      this.resetUser();
    }
    this.updateUsuarioObservable.getEMail().subscribe(valor => this.user_name = valor);
  }

  resultEvent(event) {
    if (event) {
       this.resetUser();
       this.router.navigate(['/login']);
      }
    }

    resetUser(){
      this.usuarioAutenticado=false;
      window.localStorage.removeItem(environment.keyUser);
    }

  }