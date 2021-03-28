import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import { AlertMessageForm } from '../../../../shared/components/alert-form/alert-message-form';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private alertMessageForm: AlertMessageForm) { }

  usuarioAutenticado: boolean;
  user_name: string;
  
  ngOnInit(): void {
    var access_token = window.localStorage.getItem(environment.accessToken);
    if (access_token != null) {
     
      this.usuarioService.get(JSON.stringify({})).subscribe(
        (s: any) => {
          this.user_name = s.user;
          this.usuarioAutenticado = true;
        },
        (e: any) => {
          this.alertMessageForm.showError(e.data.error, 'Sr. Usuário');
          this.usuarioAutenticado = false;
          window.localStorage.removeItem(environment.accessToken);
          window.location.href = '/login';
        }
      );
    }
  }

  resultLogout(event) {
    this.usuarioAutenticado = event;
    if(!this.usuarioAutenticado){
      window.localStorage.removeItem(environment.accessToken);
      window.location.href = '/login';
    }
  }
}