import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldValidationFormComponent } from './components/field-validation-form/field-validation-form.component';
import { ButtonSaveSubmmitComponent } from './components/buttons/button-save-submmit-form/button-save-submmit-form.component';
import { AlertFormComponent } from './components/alert-form/alert-form.component';

@NgModule({
  declarations: [FieldValidationFormComponent, 
                ButtonSaveSubmmitComponent, 
                AlertFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[FieldValidationFormComponent,
           ButtonSaveSubmmitComponent,
           AlertFormComponent
  ]
})
export class SharedModule { }