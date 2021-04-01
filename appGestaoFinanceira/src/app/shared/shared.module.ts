import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { ButtonSubmmitFormComponent } from './components/buttons/button-submmit-form/button-submmit-form.component';

@NgModule({
  declarations: [FieldValidationFormComponent,
    ButtonSubmmitFormComponent
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
    ButtonSubmmitFormComponent,
  ]
})
export class SharedModule { }