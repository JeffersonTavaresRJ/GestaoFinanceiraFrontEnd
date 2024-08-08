import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { environment } from 'src/environments/environment';
import { catchError } from "rxjs/operators";

export abstract class GenericReaderResourceService<T extends Object>{

    private apiName: string;
    private apiOption: string='';
    protected http: HttpClient;
    protected httpHeaders!: HttpHeaders;
    protected idUsuario!: string;

    constructor(injector: Injector, 
                apiName:string) 
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
        //var url = `${environment.apiUrl}${this.apiName}${this.apiOption}`;
        var url = `${this.getApiUrl()}${this.apiName}${this.apiOption}`;
        this.apiOption = '';
        return url;
    }

    setApiOption(apiOption: string) {
        this.apiOption = apiOption;
    }
  
    getById(id: number): Observable<T> {
         this.setApiOption('/GetId');
         return this.http.get<T>(`${this.getUrl()}/${id.toString()}`);
      }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.getUrl()}`);
    }

    get(): Observable<any> {
        return this.http.get<any>(this.getUrl());
     }

    GetAllReportExcel(): Observable<any>{
        this.setApiOption('/GetAllReportExcel');
        return this.http.get(this.getUrl(), {responseType: 'blob'})
          .pipe(catchError(this.handlerError));
    }

    protected handlerError(error: any): Observable<any> {
        console.error("ERRO NA REQUISIÇÃO =>" || error);
        return throwError(error);
    }

    private getApiUrl():string{
        return environment.arApiUrl[environment.IdxConnection];
    }
}