import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { GenericCommand } from './commands/generic-cmd';

export abstract class GenericResourceService<T extends Object>{

    private apiName: string;
    private apiOption: string='';
    private arcommandCreate: GenericCommand[]=[];
    protected http: HttpClient;
    protected httpHeaders!: HttpHeaders;
    protected idUsuario!: string;

    constructor(injector: Injector, 
                apiName:string,
                //passando método como parâmetro..
                protected  convertModelToCmdCreate: (model: T)=>GenericCommand,
                protected  convertModelToCmdUpdate: (model: T)=>GenericCommand,
                protected  convertModelToCmdDelete: (model: T)=>GenericCommand) 
    {
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
       var command = this.convertModelToCmdCreate(resource);
       return this.http.post(this.getUrl(), command)
        .pipe(catchError(this.handlerError)/*, 
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(this.jsonDataToResource.bind(this))*/);
    }

    postArray(resources: T[]): Observable<any> {   
        debugger; 
        this.arcommandCreate.length = 0;
        resources.forEach(element=>{
            this.arcommandCreate.push(this.convertModelToCmdCreate(element));
        });

        return this.http.post(this.getUrl(), this.arcommandCreate)
         .pipe(catchError(this.handlerError)/*, 
               --comentado para ler o retorno da mensagem de sucesso da API..
               map(this.jsonDataToResource.bind(this))*/);
    }

    put(resource: T): Observable<any> {
      debugger;  
      var command = this.convertModelToCmdUpdate(resource);
      return this.http.put(this.getUrl(), command)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>resource)*/);
    }

    deleteByKey(resource: T): Observable<any> {
        debugger;  
        var command = this.convertModelToCmdDelete(resource);
        return this.http.delete(`${this.getUrl()}/${command}`)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
      }

    deleteById(id: number): Observable<any> {
        debugger;  
        return this.http.delete(`${this.getUrl()}/${id}`)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>null)*/);
    }
  
    getById(id: number): Observable<T> {
         this.setApiOption('/GetId');
         return this.http.get<T>(`${this.getUrl()}/${id.toString()}`);
      }
/*
    getAll(): Observable<T[]> {
        var user = window.localStorage.getItem(environment.keyUser)||'';
        if (user != ''){
            this.idUsuario = JSON.parse(user).id;
        } 
        return this.http.get<T[]>(`${this.getUrl()}/${this.idUsuario}`);
    }
    */

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.getUrl()}`);
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