import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Conta } from "../../../_models/conta-model";

export class ContaCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertModelToCommand(conta: Conta):ContaCommandDelete{
        return new ContaCommandDelete(
            conta.id            
        )
    }
}