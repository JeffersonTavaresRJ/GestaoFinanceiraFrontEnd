import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export class ToastMessage {
  constructor(
    public icone: string = '',
    public severity: string = '',
    public codHttpRequest: number=0,
    public title:string='',
    public messages: string[]=[]
  ) { }
}

@Injectable()
export class BSMessage {
  private toastMessage = new BehaviorSubject<ToastMessage>(new ToastMessage());

  set(icone: string, severity:string, codHttpRequest: number, title:string, messages:string[]) {
    this.toastMessage.next(new ToastMessage(icone, severity, codHttpRequest, title, messages));
  }
  
  get() {
    return this.toastMessage;
  }  
}