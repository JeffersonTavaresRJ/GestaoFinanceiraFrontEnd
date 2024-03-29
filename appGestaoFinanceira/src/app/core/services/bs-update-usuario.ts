import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Usuario } from "src/app/features/security/_models/usuario-model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})

export class BSUpdateUsuario {

    private usuario!: Usuario;
    private nome =  new BehaviorSubject<string>("");
    private eMail = new BehaviorSubject<string>("");
    
    constructor(){
        var user = window.localStorage.getItem(environment.keyUser)||'';
        if (user != ''){
            this.usuario =  JSON.parse(user);
        }                
        if(this.usuario != null){
            this.nome =  new BehaviorSubject<string>(this.usuario.nome);
            this.eMail = new BehaviorSubject<string>(this.usuario.eMail);
        }
    }    

    setNome(valor: string) {
        this.nome.next(valor);
    }

    getNome() {        
        return this.nome;
    }  
    
    setEmail(valor: string) {
        this.eMail.next(valor);
    }

    getEMail() {
        return this.eMail;
    }    
}