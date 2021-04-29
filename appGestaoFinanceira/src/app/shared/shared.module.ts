import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FieldServerErrorsFormComponent } from './components/field-server-errors-form/field-server-errors-form.component';
import { ButtonSubmmitFormComponent } from './components/buttons/button-submmit-form/button-submmit-form.component';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { HeaderPageTitleComponent } from './components/header-page-title/header-page-title.component';
import {AppRoutingModule} from '../app.routing';
import { SpinnerPageLoadingComponent } from './components/spinner-page-loading/spinner-page-loading.component';
import { StatusComponent } from './components/radiobuttons/status/status.component';
@NgModule({
  declarations: [FieldServerErrorsFormComponent,
    ButtonSubmmitFormComponent,
    FieldValidationFormComponent,
    HeaderPageTitleComponent,
    SpinnerPageLoadingComponent,
    StatusComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml:true
    })
  ],
  exports: [ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule,
    FieldServerErrorsFormComponent,
    ButtonSubmmitFormComponent,
    FieldValidationFormComponent,
    HeaderPageTitleComponent,
    SpinnerPageLoadingComponent,
    StatusComponent,
    AppRoutingModule
  ]
})
export class SharedModule { }