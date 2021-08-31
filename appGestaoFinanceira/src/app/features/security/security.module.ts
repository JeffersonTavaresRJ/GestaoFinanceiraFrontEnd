import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioFormCreateComponent } from './usuario-form-create/usuario-form-create.component';
import { UsuarioFormDeleteComponent } from './usuario-form-delete/usuario-form-delete.component';
import { UsuarioFormUpdateComponent } from './usuario-update/usuario-form-update/usuario-form-update.component';
import { UsuarioFormUpdateSenhaComponent } from './usuario-update/usuario-form-update-senha/usuario-form-update-senha.component';
import { UsuarioFormUpdateCadastroComponent } from './usuario-update/usuario-form-update-cadastro/usuario-form-update-cadastro.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    UsuarioFormCreateComponent,
    UsuarioFormDeleteComponent,
    UsuarioFormUpdateComponent,
    UsuarioFormUpdateSenhaComponent,
    UsuarioFormUpdateCadastroComponent
  ],
  imports: [
    CommonModule,
	  SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
