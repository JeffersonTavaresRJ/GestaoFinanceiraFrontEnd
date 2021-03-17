import { Component, Input, OnInit } from '@angular/core';
import {AlertMessage} from './model/alert-message-model';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent implements OnInit {

  @Input('form-alert-message') formAlertMessage: AlertMessage;

  constructor() { }

  ngOnInit(): void {
      
  }

  closeMessage() {
    this.formAlertMessage = null;
  }
}
