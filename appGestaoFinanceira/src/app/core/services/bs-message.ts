import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export class ToastMessage {
  constructor(
    public icone: string = '',
    public severity: string = '',
    public codHttpRequest: number=0,
    public messages: any[]=[]
  ) { }
}

@Injectable()
export class BSMessage {
  private toastMessage = new BehaviorSubject<ToastMessage>(new ToastMessage());

  set(icone: string, severity:string, codHttpRequest: number, messages:any[]) {
    console.log("BSMessage");
    this.toastMessage.next(new ToastMessage(icone, severity, codHttpRequest, messages));
  }

  clear() {
    this.toastMessage.next(new ToastMessage(null, null, null, null));
  }
  
  get() {
    return this.toastMessage;
  }  
}