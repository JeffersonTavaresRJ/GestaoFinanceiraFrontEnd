import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-status',
  template: `  
      <p class="card-title">Status:</p>
      <div class="form-group">
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
         <input type="radio" class="btn-check" formControlName="status" value="true" id="btnAtivo" autocomplete="off">
         <label class="btn btn-outline-primary" for="btnAtivo">Ativo</label>

         <input type="radio" class="btn-check" formControlName="status" value="false" id="btnInativo" autocomplete="off">
         <label class="btn btn-outline-primary" for="btnInativo">Inativo</label>  
      </div>
      </div>     
  `,
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor() { }

  @Input('server-errors') serverErrors: any[];
  @Input('form-control') formControl: FormControl;

  ngOnInit(): void {
  }

}
