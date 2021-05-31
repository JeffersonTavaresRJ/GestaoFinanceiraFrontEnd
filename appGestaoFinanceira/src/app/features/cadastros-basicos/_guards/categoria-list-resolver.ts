import { Injectable } from "@angular/core";
import { GenericListResolver } from "src/app/shared/components/guard-router-generic/guard-router-generic";
import { Conta } from "../_models/conta-model";
import { ContaService } from "../_services/conta-service";

@Injectable()
export class CategoriaListResolver extends GenericListResolver<Conta> {
    
    constructor(public categoriaService : ContaService){  
        super(categoriaService);      
    }
    
}