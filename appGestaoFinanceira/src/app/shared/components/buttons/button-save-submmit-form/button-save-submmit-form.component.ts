import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button-save-submmit-form',
  templateUrl: './button-save-submmit-form.component.html',
  styleUrls: ['./button-save-submmit-form.component.css']
})
export class ButtonSaveSubmmitComponent implements OnInit {

  @Input('form-button-message') formButtonMessage: string = '';
  @Input('form-button-disabled') formButtonDisabled: boolean;
  @Input('form-button-label') formButtonLabel: string='';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //método chamado no momento que o input é alterado
    //neste método pode-se comparar o valor atual do antigo..    
  }

}
