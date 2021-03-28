import {  Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

@Component({
  selector: 'app-modal-interrogative-form',
  templateUrl: './modal-interrogative-form.component.html',
  styleUrls: ['./modal-interrogative-form.component.css']
})
export class ModalInterrogativeFormComponent implements OnInit {

  @Input('modal-interrogative-title') modalInterrogativeTitle:string;
  @Input('modal-interrogative-message') modalInterrogativeMessage:string;

  @Output() modalInterrogativeResponse = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick(response:boolean){
    this.modalInterrogativeResponse.emit(response);
  }

}
