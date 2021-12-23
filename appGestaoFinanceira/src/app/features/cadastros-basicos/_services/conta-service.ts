import { Injectable, Injector } from "@angular/core";
import { GenericResourceService } from "src/app/shared/_services/generic-resource-service";
import { Conta } from "../_models/conta-model";
import { ContaCommandCreate } from "./commands/conta/conta-cmd-create";
import { ContaCommandDelete } from "./commands/conta/conta-cmd-delete";
import { ContaCommandUpdate } from "./commands/conta/conta-cmd-update";
@Injectable({
    providedIn: 'root'
})
export class ContaService extends GenericResourceService<Conta>{
    constructor(private injector: Injector) {
        super(injector, 'api/Conta',
        ContaCommandCreate.convertModelToCommand,
        ContaCommandUpdate.convertModelToCommand,
        ContaCommandDelete.convertModelToCommand)
    }
}