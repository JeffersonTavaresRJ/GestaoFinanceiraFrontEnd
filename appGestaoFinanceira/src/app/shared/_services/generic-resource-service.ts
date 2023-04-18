import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { GenericCommand } from './commands/generic-cmd';
import { GenericReaderResourceService } from './generic-reader-resource-service';

export abstract class GenericResourceService<T extends Object> extends GenericReaderResourceService<T>{


    private command: GenericCommand[]=[];

    constructor(injector: Injector, 
                apiName:string,
                //passando método como parâmetro..
                protected  convertFormGroupToCmdCreate?: (formControl: FormGroup)=>GenericCommand,
                protected  convertFormGroupToCmdUpdate?: (formControl: FormGroup)=>GenericCommand,
                protected  convertFormGroupToCmdDelete?: (formControl: FormGroup)=>GenericCommand) 
    {
        super(injector, apiName);         
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

    jsonDataToResources(jsonData: any[]): T[] {
        const resourses: T[] = [];
        jsonData.forEach(element => resourses.push(element as T));
        return resourses;
    }    

    jsonDataToResource(jsonData: any): T {
        return jsonData as T;
    }
    
}