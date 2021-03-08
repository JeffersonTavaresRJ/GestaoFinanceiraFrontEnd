import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GenericResourceModel } from '../models/generic-resource-model'

export abstract class GenericResourceService<T extends GenericResourceModel>{

    protected apiName: string;
    private http: HttpClient;
    private url: string;

    constructor(injector: Injector, apiName: string) {
        this.apiName = apiName;
        this.url = `${environment.apiUrl}${this.apiName}`;
        this.http = injector.get(HttpClient);
    }

    post(resource: any): Observable<any> {
        return this.http.post(this.url, resource);
    }

    put(resource: any): Observable<any> {
        return this.http.put(this.url, resource);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}`);
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