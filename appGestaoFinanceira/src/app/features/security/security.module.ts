import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

import { UsuarioFormCreateComponent } from './usuario-form-create/usuario-form-create.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsuarioFormDeleteComponent } from './usuario-form-delete/usuario-form-delete.component';
import { UsuarioFormUpdateComponent } from './usuario-form-update/usuario-form-update.component';


@NgModule({
  declarations: [UsuarioFormCreateComponent, LoginFormComponent, UsuarioFormDeleteComponent, UsuarioFormUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class SecurityModule { }
