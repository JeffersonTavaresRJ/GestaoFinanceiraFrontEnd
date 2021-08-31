/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-interrogative-form',
  templateUrl: './modal-interrogative-form.component.html',
  styleUrls: ['./modal-interrogative-form.component.css']
})
export class ModalInterrogativeFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/
import {  Component, EventEmitter, Input, OnInit, Output, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-modal-interrogative-form',
  templateUrl: './modal-interrogative-form.component.html',
  styleUrls: ['./modal-interrogative-form.component.css']
})
export class ModalInterrogativeFormComponent implements OnInit {

  @Input('modal-interrogative-id') modalInterrogativeId!: string;
  @Input('modal-interrogative-title') modalInterrogativeTitle!:string;
  @Input('modal-interrogative-message') modalInterrogativeMessage!:string;

  @Output() modalInterrogativeResponse = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    
  }

  /*ngOnChanges(changes: SimpleChanges){
    
    document.getElementById('mensagem').innerHTML = changes.modalInterrogativeMessage.currentValue;
  }*/
  
  onClick(response:boolean){
    this.modalInterrogativeResponse.emit(response);
  }

}