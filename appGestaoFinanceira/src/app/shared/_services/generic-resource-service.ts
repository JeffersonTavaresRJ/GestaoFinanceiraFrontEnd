import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../_models/generic-resource-model'
import { Usuario } from '../../features/security/_models/usuario-model';

export abstract class GenericResourceService<T extends GenericResourceModel>{

    private apiName: string;
    private apiOption: string='';
    protected http: HttpClient;
    protected httpHeaders: HttpHeaders;
    private user: Usuario;

    constructor(injector: Injector, apiName:string) {
        this.http = injector.get(HttpClient);
        this.apiName = apiName;
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
       return this.http.post(this.getUrl(), resource)
        .pipe(catchError(this.handlerError)/*, 
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(this.jsonDataToResource.bind(this))*/);
    }

    put(resource: T): Observable<any> {
      return this.http.put(this.getUrl(), resource)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>resource)*/);
    }

    delete(id: number): Observable<any> {
      return this.http.delete(`${this.getUrl()}/${id}`)
        .pipe(catchError(this.handlerError)/*,
              --comentado para ler o retorno da mensagem de sucesso da API..
              map(()=>null)*/);
    }

    getById(id: number): Observable<T> {
       return this.http.get<T>(`${this.getUrl()}/${id}`);
    }

    getByUser(idUser: number): Observable<T[]> {
      return this.http.get<T[]>(`${this.getUrl()}/${idUser}`);
    }    

    getAll(idUsuario: number): Observable<T[]> {
       return this.http.get<T[]>(`${this.getUrl()}/${idUsuario}`);
    }

    //retorna todo o tipo de objeto...
    get(): Observable<any[]> {
       return this.http.get<any[]>(this.getUrl());
    }

    jsonDataToResources(jsonData: any[]): any[] {
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