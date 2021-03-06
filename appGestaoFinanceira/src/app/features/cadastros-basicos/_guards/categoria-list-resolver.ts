import { Injectable } from "@angular/core";
import { GenericListResolver } from "src/app/shared/_guards/generic-list-resolver";
import { Categoria } from "../_models/categoria-model";
import { CategoriaService } from "../_services/categoria-service";

@Injectable()
export class CategoriaListResolver extends GenericListResolver<Categoria> {
    
    constructor(public categoriaService : CategoriaService){  
        super(categoriaService);      
    }
    
}