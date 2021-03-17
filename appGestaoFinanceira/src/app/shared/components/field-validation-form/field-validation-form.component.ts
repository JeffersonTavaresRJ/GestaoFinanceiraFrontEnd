import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-field-validation-form',
  templateUrl: './field-validation-form.component.html',
  styleUrls: ['./field-validation-form.component.css']
})
export class FieldValidationFormComponent implements OnInit {

  @Input('form-validations') formValidations: any[];

  constructor() { }

  ngOnInit(): void {
  }
}