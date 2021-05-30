import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class HttpLoadingObservable{
  private isLoading = new BehaviorSubject(false);
  
  show(){
    this.isLoading.next(true);
  }

  hide(){
    this.isLoading.next(false);
  }

  getLoading(){
    return this.isLoading;
  }
  
}