import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../_models/usuario-model";
import { GenericResourceService } from "../../../shared/_services/generic-resource-service";
import { UsuarioCommandCreate } from "./commands/usuario-cmd-create";
import { UsuarioCommandUpdate } from "./commands/usuario-cmd-update";
import { UsuarioCommandDelete } from "./commands/usuario-cmd-delete";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService extends GenericResourceService<Usuario>{

    constructor(protected injector: Injector) {
        super(injector,'api/Usuario',
        UsuarioCommandCreate.convertModelToCommand,
        UsuarioCommandUpdate.convertModelToCommand,
        UsuarioCommandDelete.convertModelToCommand);          
    }    

    autenthicate(credencials: Usuario): Observable<Usuario> {
        //debugger;
        this.setApiOption('/Autenthicate');     
        return this.post(credencials);
    }    

}