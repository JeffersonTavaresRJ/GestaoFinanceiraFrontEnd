import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { GenericCommand } from './commands/generic-cmd';

export abstract class GenericResourceService<T extends Object>{

    private apiName: string;
    private apiOption: string='';
    private command: GenericCommand[]=[];
    protected http: HttpClient;
    protected httpHeaders!: HttpHeaders;
    protected idUsuario!: string;

    constructor(injector: Injector, 
                apiName:string,
                //passando método como parâmetro..
                protected  convertFormGroupToCmdCreate?: (formControl: FormGroup)=>GenericCommand,
                protected  convertFormGroupToCmdUpdate?: (formControl: FormGroup)=>GenericCommand,
                protected  convertFormGroupToCmdDelete?: (formControl: FormGroup)=>GenericCommand) 
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

    post(formGroup: FormGroup): Observable<any> {   
       debugger;
       var command = this.convertFormGroupToCmdCreate(formGroup);
       return this.http.post(this.getUrl(), command)
        .pipe(catchError(this.handlerError)/*, 
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(this.jsonDataToResource.bind(this))*/);
    }

    postArray(formGroup: FormGroup[]): Observable<any> {   
        debugger; 
        this.command.length = 0;
        formGroup.forEach(element=>{
            this.command.push(this.convertFormGroupToCmdCreate(element));
        });

        return this.http.post(this.getUrl(), this.command)
         .pipe(catchError(this.handlerError)/*, 
               --comentado para ler o retorno da mensagem de sucesso da API..
               map(this.jsonDataToResource.bind(this))*/);
    }

    put(formGroup: FormGroup): Observable<any> {
      debugger;  
      var command = this.convertFormGroupToCmdUpdate(formGroup);
      return this.http.put(this.getUrl(), command)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>resource)*/);
    }

    postBody(data={}): Observable<any> {
        return this.http.post(this.getUrl(), data)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
    }

    putBody(data={}): Observable<any> {
        return this.http.put(this.getUrl(), data)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
    }

    deleteBody(data={}): Observable<any> {
        return this.http.delete(this.getUrl(), data)
          .pipe(catchError(this.handlerError)/*,
                --comentado para ler o retorno da mensagem de sucesso da API..
                map(()=>resource)*/);
    }

    deleteByKey(formGroup: FormGroup): Observable<any> {
        debugger;  
        var command = this.convertFormGroupToCmdDelete(formGroup);
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