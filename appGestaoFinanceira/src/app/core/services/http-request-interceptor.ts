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
import { BSMessage } from './bs-message';

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
        //public bsMessage: BSMessage,
        public router : Router
    ) { }

    private user!: Usuario;
    private _countRequests:number=0;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //contador de requests..
        
        ++this._countRequests;
        //loading ativo..
        this.bsHttpLoading.setLoading(true);

        //cabeçalho com token..
        if(window.localStorage.getItem(environment.keyUser)!=null){
            var user = window.localStorage.getItem(environment.keyUser)||'';
            if (user != ''){
                var acessToken_ = JSON.parse(user).accessToken;
                request =request.clone({
                    setHeaders:{Authorization:`Bearer ${acessToken_.toString()}`}
                });
            }            
        }      

        //chamada recursiva para o próximo request.. 
        //debugger; 
        //console.log("this._countRequests: "|| this._countRequests);    
        return next.handle(request)
        .pipe( 
              map(event=>{return event;}),
              catchError(e=>{
                //debugger;
                if (e.status == 0) {
                    //servidor fora
                    this.alertMessage.showError('Erro de conexão com o servidor', e.status);
                }
                else if (e.status == 401 || e.status == 403) {
                    //token expirado
                    this.alertMessage.showInfo('Sessão expirada', e.status);
                    this.bsAutenticarUsuario.set(false);            
                    this.router.navigate(['/login']);
                }
                else if (e.status == 418) {
                    //exceções customizadas
                    this.alertMessage.showWarning(e.error, e.status);
                }else if (e.status == 404) {
                    //exceções customizadas
                    this.alertMessage.showInfo("Dados não encontrados", e.status);
                } else if (e.status == 500) {
                    //error status code 500..
                    this.alertMessage.showError(e.error, e.status);
                } else if(e.status == 400){
                    this.alertMessage.showErrors(e.error, e.status);
                } else if (e.status != 400){
                    this.alertMessage.showError(e.error, e.status);
                }                
                return throwError(e);
               }),
               //ao finalizar qq operação, oculta o loading..                
                finalize(()=>{
                    //subtraindo qtde requests..
                    --this._countRequests;
                    //enquanto tiver requests sendo realizado, manter o loading ativo..
                    this.bsHttpLoading.setLoading(this._countRequests>0);
                 })
              );
    };
}