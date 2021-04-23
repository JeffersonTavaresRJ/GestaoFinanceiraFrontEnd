import { Injectable, Injector } from "@angular/core";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Categoria } from "../_models/categoria-model";

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService extends GenericResourceService<Categoria>{
    constructor(private injector: Injector){
        super(injector);
        this.setApiName('api/Categoria');
    }
}