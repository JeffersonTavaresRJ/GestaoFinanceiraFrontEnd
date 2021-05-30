import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/template/header/header.component';
import { AppRoutingModule } from '../app.routing';
import { ModalInterrogativeFormComponent } from './components/modals/modal-interrogative-form/modal-interrogative-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, 
                 ModalInterrogativeFormComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    ModalInterrogativeFormComponent
  ]
})
export class CoreModule { }