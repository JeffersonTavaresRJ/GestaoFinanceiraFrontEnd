import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BSAutenticarUsuario {
    private autenticado = new BehaviorSubject<boolean>(false);

    constructor() { }  

    set(valor: boolean) {
      this.autenticado.next(valor);
    }
  
    get() {
      return this.autenticado;
    }
  }