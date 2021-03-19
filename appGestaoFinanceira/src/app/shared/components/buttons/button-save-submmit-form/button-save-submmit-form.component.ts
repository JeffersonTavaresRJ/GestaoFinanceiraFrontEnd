import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-save-submmit-form',
  templateUrl: './button-save-submmit-form.component.html',
  styleUrls: ['./button-save-submmit-form.component.css']
})
export class ButtonSaveSubmmitComponent implements OnInit {

  @Input('form-button-message') formButtonMessage : string='';
  @Input('form-button-disabled') formButtonDisabled : boolean;

  constructor() { }  

  ngOnInit(): void {
  } 

}
