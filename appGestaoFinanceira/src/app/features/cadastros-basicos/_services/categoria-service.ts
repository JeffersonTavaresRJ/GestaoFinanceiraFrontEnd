import { Injectable, Injector } from "@angular/core";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Categoria } from "../_models/categoria-model";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService extends GenericResourceService<Categoria>{
    constructor(private injector: Injector){
        super(injector, 'api/Categoria');        
    }   

    listarTipos(): Observable<any[]>{ 
        this.setApiOption('/GetAllTipo');
        return this.get().pipe(
          map(this.jsonDataToResources.bind(this)),
          catchError(this.handlerError)
        );        
      }
}