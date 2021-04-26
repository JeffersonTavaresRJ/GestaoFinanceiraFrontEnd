import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../_models/generic-resource-model'
import { Usuario } from '../../features/security/_models/usuario-model';

export abstract class GenericResourceService<T extends GenericResourceModel>{

    private apiName: string;
    private apiOption: string='';
    private http: HttpClient;
    private httpHeaders: HttpHeaders;
    private user: Usuario;

    constructor(injector: Injector, apiName:string) {
        this.http = injector.get(HttpClient);
        this.apiName = apiName;
        this.user = JSON.parse(window.localStorage.getItem(environment.keyUser));
        // debugger;

        if (this.user != null) {
            this.httpHeaders = new HttpHeaders()
                .set('Authorization', 'Bearer ' + this.user.accessToken.toString());
        };
    }

    private getUrl(apiName: string): string {
        var url = `${environment.apiUrl}${apiName}${this.apiOption}`;
        this.apiOption = '';
        return url;
    }

    setApiOption(apiOption: string) {
        this.apiOption = apiOption;
    }

    post(resource: any): Observable<any> {
        return this.http.post(this.getUrl(this.apiName), resource, { headers: this.httpHeaders });
    }

    put(resource: any): Observable<any> {
        return this.http.put(this.getUrl(this.apiName), resource, { headers: this.httpHeaders });
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.getUrl(this.apiName)}/${id}`, { headers: this.httpHeaders });
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.getUrl(this.apiName)}/${id}`, { headers: this.httpHeaders });
    }

    getByUser(idUser: number): Observable<any> {
        return this.http.get(`${this.getUrl(this.apiName)}/${idUser}`, { headers: this.httpHeaders });
    }

    get(): Observable<any> {
        return this.http.get(this.getUrl(this.apiName), { headers: this.httpHeaders });
    }

    getAll(idUsuario: number): Observable<any> {
        return this.http.get(`${this.getUrl(this.apiName)}/${idUsuario}`, { headers: this.httpHeaders });
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