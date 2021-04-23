import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FieldServerErrorsFormComponent } from './components/field-server-errors-form/field-server-errors-form.component';
import { ButtonSubmmitFormComponent } from './components/buttons/button-submmit-form/button-submmit-form.component';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { GenericResourceListComponent } from './components/generic-resource-list/generic-resource-list.component';
import { HeaderPageTitleComponent } from './components/header-page-title/header-page-title.component';
import {AppRoutingModule} from '../app.routing';
@NgModule({
  declarations: [FieldServerErrorsFormComponent,
    ButtonSubmmitFormComponent,
    FieldValidationFormComponent,
    HeaderPageTitleComponent
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
    AppRoutingModule
  ]
})
export class SharedModule { }