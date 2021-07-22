import { Injectable } from "@angular/core";
import { GenericFormResolver } from "src/app/shared/_guards/generic-form-resolver";
import { Categoria } from "../_models/categoria-model";
import { CategoriaService } from "../_services/categoria-service";

@Injectable()
export class CategoriaFormResolver extends GenericFormResolver<Categoria> {
    
    constructor(public categoriaService : CategoriaService){  
        super(categoriaService);      
    }   
}