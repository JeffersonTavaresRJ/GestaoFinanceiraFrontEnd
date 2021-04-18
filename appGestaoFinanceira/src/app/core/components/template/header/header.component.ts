import { Component, OnInit } from '@angular/core';
import { AutenticarUsuarioObservable } from 'src/app/core/services/AutenticarUsuarioObservable';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
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
    this.updateUsuarioObservable.getEMail().subscribe(valor => this.user_name = valor);
    
    this.user = JSON.parse(window.localStorage.getItem(environment.keyUser));
    if (this.user != null) {
      // debugger;
      this.usuarioService.get(JSON.stringify({})).subscribe(
        (s: any) => {
          this.user_name = s.user;
          this.usuarioAutenticado = true;
        },
        (e: any) => {
          this.usuarioAutenticado = false;
          window.localStorage.removeItem(environment.keyUser);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  resultEvent(event) {
    this.usuarioAutenticado = event;
    if (!this.usuarioAutenticado) {
      window.localStorage.removeItem(environment.keyUser);
      this.router.navigate(['/login']);
    }
  }
}