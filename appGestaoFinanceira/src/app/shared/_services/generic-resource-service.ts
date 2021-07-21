import { Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { GenericResourceModel } from '../_models/generic-resource-model';
import { GenericBaseService } from './generic-base-service';

export abstract class GenericResourceService<T extends GenericResourceModel>
 extends GenericBaseService<T>{

    constructor(injector: Injector, apiName:string) {
        super(injector, apiName);
    }

    deleteById(id: number): Observable<any> {
      return this.http.delete(`${this.getUrl()}/${id}`)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>null)*/);
    }

    getById(id: number): Observable<T> {
       return this.http.get<T>(`${this.getUrl()}/${id}`);
    }

    getAll(): Observable<T[]> {
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