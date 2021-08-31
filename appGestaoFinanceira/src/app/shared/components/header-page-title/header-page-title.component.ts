import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-page-title',
  templateUrl: './header-page-title.component.html',
  styleUrls: ['./header-page-title.component.css']
})
export class HeaderPageTitleComponent implements OnInit {

  @Input('header-title') headerTitle!:string;
  @Input('header-button-label') headerButtonLabel!:string;
  @Input('header-button-link') headerButtonLink!:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
