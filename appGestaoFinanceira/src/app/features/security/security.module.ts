import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsuarioFormDeleteComponent } from './usuario-form-delete/usuario-form-delete.component';


@NgModule({
  declarations: [UsuarioFormComponent, LoginFormComponent, UsuarioFormDeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class SecurityModule { }
