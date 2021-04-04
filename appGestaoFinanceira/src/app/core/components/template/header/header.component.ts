import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario-model';
import { UsuarioService } from 'src/app/shared/services/usuario-resource-service';
import { environment } from 'src/environments/environment';
import {AlertMessageForm} from '../../../../shared/components/alert-form/alert-message-form';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private alertMessageForm: AlertMessageForm) { }

  usuarioAutenticado: boolean;  
  user_name: string;
  private user: Usuario;
  
  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem(environment.keyUser));
       
    if (this.user != null) {
     // debugger;
      this.usuarioService.get(JSON.stringify({})).subscribe(
        (s: any) => {
          this.user_name = s.user;
          this.usuarioAutenticado = true;                 
        },
        (e: any) => {
          if (e.status==401){
            this.alertMessageForm.showError('Sessão expirada', 'Sr. Usuário');            
          }else{
            this.alertMessageForm.showError(e.error.error, 'Sr. Usuário');           
          } 
          this.usuarioAutenticado = false;
          window.localStorage.removeItem(environment.keyUser);
          window.location.href = '/login';
        }
      );      
    }
  }

  resultEvent(event) {    
    this.usuarioAutenticado = event;
    if(!this.usuarioAutenticado){
      window.localStorage.removeItem(environment.keyUser);      
      window.location.href = '/login';
    }
  }
}