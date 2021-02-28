import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import {GenericResourceModel} from '../models/generic-resource-model'

abstract class GenericResourceService< T extends GenericResourceModel>{
   
    protected http: HttpClient;

    constructor(protected apiName :string){
      
    }

    public insert(resource: T):Observable<any>{
        const url = environment.apiUrl + "/"+ this.apiName;
        return this.http.post(url, resource);
    }

    public update(resource: T):Observable<any>{
        const url = environment.apiUrl + "/"+ this.apiName;
        return this.http.put(url, resource);
    } 
    
    public delete(resource: T):Observable<any>{
       const url = environment.apiUrl + "/"+ this.apiName + "/" + resource.id;
       return this.http.delete(url);
    }    
    
    protected jsonDataToResources(jsonData: any[]): T [] {
        const resourses: T[] = [];
        jsonData.forEach(element=>resourses.push(element as T));
        return resourses;
    }

    protected jsonDataToResource(jsonData: any): T {
        return jsonData as T;
    }

    protected handlerError(error: any):Observable<any>{
        console.error("ERRO NA REQUISIÇÃO =>" || error);
        return throwError(error);
    }
}