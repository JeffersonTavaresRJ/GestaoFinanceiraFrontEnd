import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'
import { HttpLoadingObservable } from './core/services/http-loading-observable'
import { environment } from '../environments/environment';
import { Usuario } from './features/security/_models/usuario-model';
import { AlertMessageForm } from './shared/components/alert-form/alert-message-form';
import { AutenticarUsuarioObservable } from './core/services/autenticar-usuario-observable';
import { Router } from '@angular/router';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        public loadingService: HttpLoadingObservable,
        public alertMessage: AlertMessageForm,
        public autenticarUsuarioObservable : AutenticarUsuarioObservable,
        public router : Router
    ) { }

    private user: Usuario;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //loading ativo..
        this.loadingService.show();
        
        //cabeçalho com token..
        this.user = JSON.parse(window.localStorage.getItem(environment.keyUser)); 
        if(this.user!= null){
            request =request.clone({
                setHeaders:{Authorization:`Bearer ${this.user.accessToken.toString()}`}
            });
        }        

        //chamada recursiva para o próximo request..      
        return next.handle(request)
        .pipe(  
               catchError(e=>{
                if (e.status == 0) {
                    //servidor fora
                    this.alertMessage.showError('Erro de conexão com o servidor', 'Sr. Usuário');
                }
                else if (e.status == 401 || e.status == 403) {
                    //token expirado
                    this.alertMessage.showInfo('Sessão expirada', 'Operação Cancelada');
                    this.autenticarUsuarioObservable.set(false);            
                    this.router.navigate(['/login']);
                }
                else if (e.status == 418) {
                    //exceções customizadas
                    this.alertMessage.showInfo(e.error, 'Sr. Usuário');
                } else if (e.status == 500) {
                    //error status code 500..
                    this.alertMessage.showError(e.error, 'Sr. Usuário');
                } else {
                    this.alertMessage.showError(e.error, 'Sr. Usuário');
                    console.log(e.error.error);
                }
                return throwError(e);
               }),
               //ao finalizar qq operação, oculta o loading..
                finalize(()=>this.loadingService.hide())
              );
    };
}