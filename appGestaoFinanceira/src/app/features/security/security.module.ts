import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [UsuarioFormComponent, LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class SecurityModule { }
