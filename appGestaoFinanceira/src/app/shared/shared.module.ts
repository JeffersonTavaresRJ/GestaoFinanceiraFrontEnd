import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { ButtonSaveSubmmitComponent } from './components/buttons/button-save-submmit-form/button-save-submmit-form.component';
import { ButtonLogonSubmmitFormComponent } from './components/buttons/button-logon-submmit-form/button-logon-submmit-form.component';

@NgModule({
  declarations: [FieldValidationFormComponent,
    ButtonSaveSubmmitComponent,
    ButtonLogonSubmmitFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  exports: [ReactiveFormsModule,
    ToastrModule,
    BrowserAnimationsModule,
    FieldValidationFormComponent,
    ButtonSaveSubmmitComponent,
    ButtonLogonSubmmitFormComponent
  ]
})
export class SharedModule { }