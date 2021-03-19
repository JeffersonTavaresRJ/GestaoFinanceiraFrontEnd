import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { AlertMessage } from './model/alert-message-model';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent implements OnInit, OnChanges {

  @Input('form-alert-message') formAlertMessage: AlertMessage;

  constructor() { }

  alert: AlertMessage;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    //método chamado no momento que o input é alterado
    //neste método pode-se comparar o valor atual do antigo..
    this.alert = changes.formAlertMessage.currentValue;

    if (this.alert!=null){
      if (this.alert.action == 'success') {
        Swal.fire({
          toast: true,
          background: '#F0FFF0',
          position: 'top-end',
          icon: 'success',
          title: this.alert.description,
          showConfirmButton: false,
          timer: 3500
        });
      }else if(this.alert.action == 'error'){
        Swal.fire({
          toast: true,
          background: '#FFDAB9',
          position: 'top-end',
          icon: 'error',
          title: this.alert.description,
          showConfirmButton: false,
          timer: 3500
        });
      }else{
        Swal.fire({
          toast: true,
          background: '#F0FFFF',
          position: 'top-end',
          icon: 'info',
          title: this.alert.description,
          showConfirmButton: false,
          timer: 3500
        });
      }
    }    
  }  
}