import { Component, Inject, inject, Input, OnInit, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message-interrogative',
  templateUrl: './dialog-message-interrogative.component.html',
  styleUrls: ['./dialog-message-interrogative.component.css']
})
export class DialogMessageInterrogativeComponent{

  headerTitle: string;
  contentMessageInterrogative: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, 
                                                       messageInterrogative: string}) {      
    }
}