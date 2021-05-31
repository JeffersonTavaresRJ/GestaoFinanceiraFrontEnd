import { Injectable } from "@angular/core";
import { GenericListResolver } from "src/app/shared/components/guard-router-generic/guard-router-generic";
import { Conta } from "../_models/conta-model";
import { ContaService } from "../_services/conta-service";

@Injectable()
export class ContaListResolver extends GenericListResolver<Conta> {
    
    constructor(public contaService : ContaService){  
        super(contaService);      
    }    
}