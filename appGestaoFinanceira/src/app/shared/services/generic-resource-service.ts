import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GenericResourceModel } from '../models/generic-resource-model'

export abstract class GenericResourceService<T extends GenericResourceModel>{

    private apiName: string;
    private http: HttpClient;
    private httpHeaders: HttpHeaders;   

    constructor(injector: Injector) {
        this.http = injector.get(HttpClient);      
        this.httpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ' + window.localStorage.getItem(environment.accessToken));
    }

    private getUrl(apiName:string):string{
        return `${environment.apiUrl}${apiName}`;
    }

    post(resource: any): Observable<any> {   
      return this.http.post(this.getUrl(this.apiName), resource,{headers:this.httpHeaders});
    }

    put(resource: any): Observable<any> {
        return this.http.put(this.getUrl(this.apiName), resource,{headers:this.httpHeaders});
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.getUrl(this.apiName)}/${id}`, {headers:this.httpHeaders});
    }

    get(resource: any): Observable<any> {
        return this.http.get(this.getUrl(this.apiName), {headers:this.httpHeaders});
    }

    jsonDataToResources(jsonData: any[]): T[] {
        const resourses: T[] = [];
        jsonData.forEach(element => resourses.push(element as T));
        return resourses;
    }

    jsonDataToResource(jsonData: any): T {
        return jsonData as T;
    }   
    
    setApiName(apiName:string){
        this.apiName = apiName;
    }

    protected handlerError(error: any): Observable<any> {
        console.error("ERRO NA REQUISIÇÃO =>" || error);
        return throwError(error);
    }
}