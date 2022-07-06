import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './components/error404/error404.component';
import { ModalInterrogativeFormComponent } from './components/modals/modal-interrogative-form/modal-interrogative-form.component';
import { HeaderComponent } from './components/template/header/header.component';
import { DateFormatToStringPipe } from './pipes/date/date-format-to-string.pipe';
import { RouterModule } from '@angular/router';
import { StringSplitPipe } from './pipes/string/string-split.pipe';
import { StringSubstrPipe } from './pipes/string/string-substr.pipe';

@NgModule({
  declarations: [
    Error404Component,
    ModalInterrogativeFormComponent,
    HeaderComponent,
    DateFormatToStringPipe,
    StringSplitPipe,
    StringSubstrPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    Error404Component,
    ModalInterrogativeFormComponent,
    DateFormatToStringPipe,
    StringSplitPipe,
    StringSubstrPipe
  ]
})
export class CoreModule { }
