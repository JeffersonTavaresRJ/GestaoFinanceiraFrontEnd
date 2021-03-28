import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-logon-submmit-form',
  templateUrl: './button-logon-submmit-form.component.html',
  styleUrls: ['./button-logon-submmit-form.component.css']
})
export class ButtonLogonSubmmitFormComponent implements OnInit {

  @Input('form-button-message') formButtonMessage: string = '';
  @Input('form-button-disabled') formButtonDisabled: boolean;
    
  constructor() { }

  ngOnInit(): void {
  }

}
