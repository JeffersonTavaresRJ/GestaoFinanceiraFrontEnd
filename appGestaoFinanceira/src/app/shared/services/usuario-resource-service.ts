import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario-model";
import { GenericResourceService } from "./generic-resource-service";

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService extends GenericResourceService<Usuario>{

    constructor(protected injector: Injector) {
        super(injector, 'api/Usuario');
    }

    autenthicate(credencials: any): Observable<Usuario> {
        this.apiName += '/Autenthicate';
        return this.post(credencials);

    }

}