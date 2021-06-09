import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BSHttpLoading } from './core/services/bs-http-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gestao Financeira';
  
  constructor(private bsHttpLoading: BSHttpLoading,
    private spinner: NgxSpinnerService) {

      this.bsHttpLoading.getLoading().subscribe(
        value=>{
          if(value){
             this.spinner.show();
        }else{
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
          }, 200);       
        }}
      );
  }
}