import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export class ToastMessage {
  constructor(
    public icone: string = '',
    public severity: string = '',
    public codHttpRequest: number=0,
    public messages: string[]=[]
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class BSMessage {
  private toastMessage = new BehaviorSubject<ToastMessage>(new ToastMessage());

  set(icone: string, severity:string, codHttpRequest: number, messages:string[]) {
    this.toastMessage.next(new ToastMessage(icone, severity, codHttpRequest, messages));
  }
  
  get() {
    return this.toastMessage;
  }  
}