import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-submmit-form',
  templateUrl: './button-submmit-form.component.html',
  styleUrls: ['./button-submmit-form.component.css']
})
export class ButtonSubmmitFormComponent implements OnInit {

  constructor() { }

  @Input('button-disabled') buttonDisabled:boolean;
  @Input('button-message') buttonMessage:string;
  @Input('button-title') buttonTitle:string;
  @Input('button-path-ico') buttonPathIco:string

  ngOnInit(): void {
  }

}
