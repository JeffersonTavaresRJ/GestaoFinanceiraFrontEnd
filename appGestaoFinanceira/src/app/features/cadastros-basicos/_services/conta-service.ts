import { Injectable, Injector } from "@angular/core";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Conta } from "../_models/conta-model";
@Injectable({
    providedIn: 'root'
})
export class ContaService extends GenericResourceService<Conta>{
    constructor(private injector: Injector) {
        super(injector, 'api/Conta')
    }
}