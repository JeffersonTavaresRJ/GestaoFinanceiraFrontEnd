import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../_models/usuario-model";
import { GenericResourceService } from "../../../shared/_services/generic-resource-service";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService extends GenericResourceService<Usuario>{

    constructor(protected injector: Injector) {
        super(injector,'api/Usuario');          
    }    

    autenthicate(credencials: Usuario): Observable<Usuario> {
        //debugger;
        this.setApiOption('/Autenthicate');     
        return this.post(credencials);
    }    

}