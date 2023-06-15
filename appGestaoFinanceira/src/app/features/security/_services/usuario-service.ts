import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../_models/usuario-model";
import { GenericResourceService } from "../../../shared/_services/generic-resource-service";
import { UsuarioCommandCreate } from "./commands/usuario-cmd-create";
import { UsuarioCommandUpdate } from "./commands/usuario-cmd-update";
import { UsuarioCommandDelete } from "./commands/usuario-cmd-delete";
import { catchError } from "rxjs/operators";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService extends GenericResourceService<Usuario>{

    constructor(protected injector: Injector) {
        super(injector,'api/Usuario',
        UsuarioCommandCreate.convertFormGroupToCommand,
        UsuarioCommandUpdate.convertFormGroupToCommand,
        UsuarioCommandDelete.convertFormGroupToCommand);          
    }    

    autenthicate(credentials: Usuario): Observable<Usuario> {
        this.setApiOption('/Autenthicate'); 
        return this.http.post(this.getUrl(), credentials)
        .pipe(catchError(this.handlerError)/*, 
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(this.jsonDataToResource.bind(this))*/);    
    } 
    
    put(formGroup: FormGroup): Observable<any> {
        return this.http.put(this.getUrl(), formGroup.value)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
      }
}