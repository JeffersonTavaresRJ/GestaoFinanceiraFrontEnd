import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovPrevistaService } from 'src/app/features/lancamentos/_services/mov-prevista-service';

@Component({
  selector: 'app-dropdown-prioridade',
  templateUrl: './drpd-prioridade.component.html',
  styleUrls: ['./drpd-prioridade.component.css']
})
export class DropDownPrioridadeComponent{

  @Input('formGroup') formGroupResource: FormGroup;
  @Input('formControlName') formControlName: string;
  @Input('disabled') isDisabled: boolean;
  @Output('OnChange') _onChange = new EventEmitter();

  arAny: any[] = [];

  constructor(protected movPrevistaService: MovPrevistaService) {
    this.movPrevistaService.GetAllPrioridades().subscribe(
      (result) => { this.arAny = result; }
    );
  }

  onChange() {
    this._onChange.emit(true);
  }
}
