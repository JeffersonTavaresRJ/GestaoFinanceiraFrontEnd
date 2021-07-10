import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators'
import { BSHttpLoading } from './bs-http-loading'
import { environment } from '../../../environments/environment';
import { Usuario } from '../../features/security/_models/usuario-model';
import { AlertMessageForm } from '../../shared/components/alert-form/alert-message-form';
import { BSAutenticarUsuario } from './bs-autenticar-usuario';
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
        public bsHttpLoading: BSHttpLoading,
        public alertMessage: AlertMessageForm,
        public bsAutenticarUsuario : BSAutenticarUsuario,
        public router : Router
    ) { }

    private user: Usuario;
    private _countRequests:number=0;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercept');

        //contador de requests..
        ++this._countRequests;
        //loading ativo..
        this.bsHttpLoading.setLoading(true);
    
        
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
              map(event=>{return event;}), 
              catchError(e=>{
                if (e.status == 0) {
                    //servidor fora
                    this.alertMessage.showError('Erro de conexão com o servidor', 'Sr. Usuário');
                }
                else if (e.status == 401 || e.status == 403) {
                    //token expirado
                    this.alertMessage.showInfo('Sessão expirada', 'Operação Cancelada');
                    this.bsAutenticarUsuario.set(false);            
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
                finalize(()=>{
                    //subtraindo qtde requests..
                    --this._countRequests;
                    console.log(this._countRequests);
                    //enquanto tiver requests sendo realizados, manter o loading ativo..
                    this.bsHttpLoading.setLoading(this._countRequests>0);
                    console.log('fim intercept');
                })
              );
    };
}