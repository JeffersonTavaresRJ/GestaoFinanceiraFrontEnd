import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { UsuarioService } from 'src/app/features/security/_services/usuario-service';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { GenericResourceModel } from 'src/app/shared/_models/generic-resource-model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<GenericResourceFormComponent<GenericResourceModel>> {

  constructor(private usuarioService: UsuarioService,
              private bsAutenticarUsuario : BSAutenticarUsuario) { }
  
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.usuarioService.get().pipe(
        map((m)=>{
            if(m.user != null){
              this.bsAutenticarUsuario.set(true);
              return true;
            }else{
              this.bsAutenticarUsuario.set(false);
              return false;
            }
      }));
    }

    canDeactivate(component: GenericResourceFormComponent<GenericResourceModel>, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      /*para implementar qq rotina ao sair da tela..*/
      return true;
    }
    
  }