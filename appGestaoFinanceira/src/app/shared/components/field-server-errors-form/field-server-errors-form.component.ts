import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-server-errors-form',
  template: `<span class="text-danger mt-1" *ngFor="let item of serverErrors">
                  <strong *ngFor="let item of item.errors">{{item}}</strong>
            </span>`,
  styleUrls: ['./field-server-errors-form.component.css']
})
export class FieldServerErrorsFormComponent implements OnInit {

  @Input('server-errors') serverErrors: any[];

  constructor() { }

  ngOnInit(): void {
  }
}