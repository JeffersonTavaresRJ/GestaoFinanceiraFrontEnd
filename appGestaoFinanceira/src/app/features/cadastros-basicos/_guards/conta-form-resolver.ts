import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { GenericFormResolver } from "src/app/shared/_guards/generic-form-resolver";
import { Conta } from "../_models/conta-model";
import { ContaService } from "../_services/conta-service";

@Injectable()
export class ContaFormResolver extends GenericFormResolver<Conta> {
    
    constructor(public contaService : ContaService){  
        super(contaService);      
    }   
}