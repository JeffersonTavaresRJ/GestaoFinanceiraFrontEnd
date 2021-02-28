import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { LoginFormComponent } from './login-form/login-form.component';




@NgModule({
  declarations: [UsuarioFormComponent, LoginFormComponent],
  imports: [
    CommonModule
  ]
})
export class SecurityModule { }
