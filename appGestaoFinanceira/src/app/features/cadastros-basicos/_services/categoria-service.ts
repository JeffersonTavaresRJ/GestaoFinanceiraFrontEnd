import { Injectable, Injector } from "@angular/core";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Categoria } from "../_models/categoria-model";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CategoriaCommandCreate } from "./commands/categoria/categoria-cmd-create";
import { CategoriaCommandUpdate } from "./commands/categoria/categoria-cmd-update";
import { CategoriaCommandDelete } from "./commands/categoria/categoria-cmd-delete";

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService extends GenericResourceService<Categoria>{
    constructor(private injector: Injector){
        super(injector, 'api/Categoria',
        CategoriaCommandCreate.convertFormGroupToCommand,
        CategoriaCommandUpdate.convertFormGroupToCommand,
        CategoriaCommandDelete.convertFormGroupToCommand);        
    }   

    listarTipos(): Observable<any[]>{ 
        this.setApiOption('/GetAllTipo');
        return this.get().pipe(
          map(this.jsonDataToResources.bind(this)),
          catchError(this.handlerError)
        );        
    }

    GetAllReportExcel(): Observable<any>{
      this.setApiOption('/GetAllReportExcel');
      return this.http.get(this.getUrl(), {responseType: 'blob'})
        .pipe(catchError(this.handlerError));
  }
}