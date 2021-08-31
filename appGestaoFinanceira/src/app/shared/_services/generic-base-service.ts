import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

export abstract class GenericBaseService<T extends Object>{

    private apiName: string;
    private apiOption: string='';
    protected http: HttpClient;
    protected httpHeaders!: HttpHeaders;
    protected idUsuario!: string;

    constructor(injector: Injector, apiName:string) {
        this.http = injector.get(HttpClient);
        this.apiName = apiName;
        if(window.localStorage.getItem(environment.keyUser)!=null){
            var user = window.localStorage.getItem(environment.keyUser)||'';
            if (user != ''){
                this.idUsuario = JSON.parse(user).id;
            }            
        }        
    }

    protected getUrl(): string {
        var url = `${environment.apiUrl}${this.apiName}${this.apiOption}`;
        this.apiOption = '';
        return url;
    }

    setApiOption(apiOption: string) {
        this.apiOption = apiOption;
    }

    post(resource: T): Observable<any> {   
       debugger;  
       return this.http.post(this.getUrl(), resource)
        .pipe(catchError(this.handlerError)/*, 
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(this.jsonDataToResource.bind(this))*/);
    }

    put(resource: T): Observable<any> {
      debugger;  
      return this.http.put(this.getUrl(), resource)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>resource)*/);
    }

    getAll(): Observable<T[]> {
        var user = window.localStorage.getItem(environment.keyUser)||'';
        if (user != ''){
            this.idUsuario = JSON.parse(user).id;
        } 
        return this.http.get<T[]>(`${this.getUrl()}/${this.idUsuario}`);
    }

    get(): Observable<any> {
        return this.http.get<any>(this.getUrl());
     }

    jsonDataToResources(jsonData: any[]): T[] {
        const resourses: T[] = [];
        jsonData.forEach(element => resourses.push(element as T));
        return resourses;
    }    

    jsonDataToResource(jsonData: any): T {
        return jsonData as T;
    }    

    protected handlerError(error: any): Observable<any> {
        console.error("ERRO NA REQUISIÇÃO =>" || error);
        return throwError(error);
    }
}