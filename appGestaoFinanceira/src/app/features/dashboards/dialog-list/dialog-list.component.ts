import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataItems {
  descricao: string, valor: number, percentual: number;
}

export interface DialogData{
  header: string, 
  dataItems: DataItems[]
}


@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.css']
})
export class DialogListComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit(): void {}

}
