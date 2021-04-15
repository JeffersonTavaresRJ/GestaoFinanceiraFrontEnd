import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-validation-form',
  template: `<span class="text-danger mt-1">
                  <strong>{{errorMessage}}</strong>
             </span>`,
  styleUrls: ['./field-validation-form.component.css']
})
export class FieldValidationFormComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (this.isInvalidControl()) {
      return this.getError();
    }else{
      return null;
    }
  }

  private isInvalidControl(): boolean {
    return (!this.formControl.pristine) && this.formControl.invalid;
  }

  private getError(): string | null {
    if(this.formControl.errors.required){
      return 'Campo obrigatório';
    }else if( this.formControl.errors.email){
      return 'e-mail inválido';
    }else if(this.formControl.errors.senhasNaoConferem){
      return this.formControl.errors.message;
    }else if(this.formControl.errors.senhaInvalida){
      return this.formControl.errors.message;
    }
  }
}
