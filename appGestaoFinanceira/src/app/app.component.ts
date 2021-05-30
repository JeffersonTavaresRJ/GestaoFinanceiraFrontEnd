import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpLoadingObservable } from '../app/core/services/http-loading-observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gestao Financeira';
  
  constructor(private HttpLoadingObservable: HttpLoadingObservable,
    private spinner: NgxSpinnerService) {

      this.HttpLoadingObservable.getLoading().subscribe(
        value=>{
          if(value){
            this.spinner.show();
        }else{
          setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
          }, 1000);          
        }}
      );
  }
}