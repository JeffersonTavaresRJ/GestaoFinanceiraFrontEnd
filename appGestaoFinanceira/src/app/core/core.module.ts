import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/template/header/header.component';
import { Error404Component } from './components/error404/error404.component';
import { AppRoutingModule } from '../app.routing';
import { ModalInterrogativeFormComponent } from './components/modals/modal-interrogative-form/modal-interrogative-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, 
                 Error404Component,
                 ModalInterrogativeFormComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    Error404Component,
    ModalInterrogativeFormComponent
  ]
})
export class CoreModule { }