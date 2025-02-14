import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FieldServerErrorsFormComponent } from './components/field-server-errors-form/field-server-errors-form.component';
import { ButtonSubmmitFormComponent } from './components/buttons/button-submmit-form/button-submmit-form.component';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { HeaderPageTitleComponent } from './components/header-page-title/header-page-title.component';
import { AppRoutingModule } from '../app.routing';
import { SpinnerPageLoadingComponent } from './components/spinner-page-loading/spinner-page-loading.component';
import { DialogMessageInterrogativeComponent } from './components/dialogs/dialog-message-interrogative/dialog-message-interrogative.component';
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [FieldServerErrorsFormComponent,
    ButtonSubmmitFormComponent,
    FieldValidationFormComponent,
    HeaderPageTitleComponent,
    SpinnerPageLoadingComponent,
    DialogMessageInterrogativeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    ToastrModule.forRoot()
   /* ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml:true
    })*/
  ],
  exports: [ReactiveFormsModule,
   ToastrModule,
    BrowserAnimationsModule,
    FieldServerErrorsFormComponent,
    ButtonSubmmitFormComponent,
    FieldValidationFormComponent,
    HeaderPageTitleComponent,
    AppRoutingModule,
    SpinnerPageLoadingComponent
  ]})
export class SharedModule { }