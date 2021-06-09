import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class BSHttpLoading{
  private isLoading = new BehaviorSubject(false);
  
  setLoading(value:boolean){
      this.isLoading.next(value); 
  }

  getLoading(){
    return this.isLoading;
  }
  
}