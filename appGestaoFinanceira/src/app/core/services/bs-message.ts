import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export class ToastMessage {
  constructor(
    public icone: string = '',
    public severity: string = '',
    public title: string = '',
    public messages: string[]=[]
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class BSMessage {
  private toastMessage = new BehaviorSubject<ToastMessage>(new ToastMessage());

  set(icone: string, severity:string, title:string, messages:string[]) {
    this.toastMessage.next(new ToastMessage(icone, severity, title, messages));
  }
  
  get() {
    return this.toastMessage;
  }  
}