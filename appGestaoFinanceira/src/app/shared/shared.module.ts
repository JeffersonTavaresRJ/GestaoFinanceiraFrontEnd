import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { ButtonSaveSubmmitComponent } from './components/buttons/button-save-submmit-form/button-save-submmit-form.component';
import { AlertFormComponent } from './components/alert-form/alert-form.component';


@NgModule({
  declarations: [FieldValidationFormComponent, 
                ButtonSaveSubmmitComponent, 
                AlertFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({ /* options */ })
  ],
  exports:[ReactiveFormsModule,
           FieldValidationFormComponent,
           ButtonSaveSubmmitComponent,
           AlertFormComponent,
           SweetAlert2Module
  ]
})
export class SharedModule { }