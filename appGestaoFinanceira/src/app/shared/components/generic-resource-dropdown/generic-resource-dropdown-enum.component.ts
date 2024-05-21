import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GenericResourceDropDownEnumModel } from 'src/app/shared/components/generic-resource-dropdown/models/generic-resource-dropdown-enum-model';

@Directive()
export abstract class GenericResourceDropDownEnumComponent implements OnInit{

  @Input('form-group') formGroupResource: FormGroup;
  @Input('form-control') formControl: FormControl;
  @Input('disabled') isDisabled: boolean;
  @Input('placeholder') placeholder: string;
  @Output('OnChange') _onChange = new EventEmitter();

  arEnum: GenericResourceDropDownEnumModel[] = [];

  constructor(){}
  onPopulate(){}

  ngOnInit(): void {
    this.onPopulate();
  }

  onChange() {
    this._onChange.emit(true);
  }
}
