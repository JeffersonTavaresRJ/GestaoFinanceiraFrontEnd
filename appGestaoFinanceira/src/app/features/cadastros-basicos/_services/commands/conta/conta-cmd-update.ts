import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Conta } from "../../../_models/conta-model";

export class ContaCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null,
        public defaultConta: string = 'N'
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):ContaCommandUpdate{
        return new ContaCommandUpdate(
            formGroup.get('id').value,
            formGroup.get('descricao').value,
            formGroup.get('status').value,
            formGroup.get('defaultConta').value
        )
    }
    static convertModelToCommand(conta: Conta):ContaCommandUpdate{
        return new ContaCommandUpdate(
            conta.id,
            conta.descricao,
            conta.status,
            conta.defaultConta
        )
    }
}