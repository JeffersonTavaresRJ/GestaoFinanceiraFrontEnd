import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Usuario } from "src/app/shared/models/usuario-model";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})

export class UpdateUsuarioObservable {

    private usuario: Usuario= JSON.parse(window.localStorage.getItem(environment.keyUser));;
    private nome = new BehaviorSubject<string>(this.usuario.nome);
    private email = new BehaviorSubject<string>(this.usuario.eMail);

    setNome(valor: string) {
        this.nome.next(valor);
    }

    getNome() {
        return this.nome;
    }  
    
    setEmail(valor: string) {
        this.email.next(valor);
    }

    getEMail() {
        return this.email;
    }    
}