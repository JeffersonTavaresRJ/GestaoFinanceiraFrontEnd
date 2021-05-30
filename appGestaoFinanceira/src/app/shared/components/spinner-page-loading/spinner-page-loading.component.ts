import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-page-loading',
  template: `  
    <div class="d-flex justify-content-center m-5">
      <div class="spinner-border m-5" style="width: 4rem; height: 4rem;"></div>
    </div>  
  `,
  styleUrls: ['./spinner-page-loading.component.css']
})
export class SpinnerPageLoadingComponent implements OnInit {

  constructor() { } 

  ngOnInit(): void {
  }

}
