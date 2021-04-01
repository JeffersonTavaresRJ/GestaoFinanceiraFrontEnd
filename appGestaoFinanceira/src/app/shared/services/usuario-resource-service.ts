import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario-model";
import { GenericResourceService } from "./generic-resource-service";

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService extends GenericResourceService<Usuario>{

    constructor(protected injector: Injector) {
        super(injector);
        this.setApiName('api/Usuario');     
    }    

    autenthicate(credencials: any): Observable<Usuario> {
        this.setApiName('api/Usuario/Autenthicate');     
        return this.post(credencials);
    }

    deleteUsuario(id:number, email:string, senha:string): Observable<Usuario>{
        
        var credencials={
            EMail: email,
            Senha: senha
        }   
        
        this.autenthicate(credencials).subscribe(
            (s:any)=>{
                return super.delete(id);
            },
            (e:any)=>{
                return new Observable<Usuario>(obs=>{
                    ()=>{
                        obs.error(e.error);
                    }
                })
            }            
        );

        return new Observable<Usuario>(obs=>{
            ()=>{
                obs.error(null);
            }
        })
        
    }

}