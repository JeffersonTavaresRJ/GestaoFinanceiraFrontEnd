import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class FormaPagamentoCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):FormaPagamentoCommandUpdate{
        return new FormaPagamentoCommandUpdate(
            formGroup.get('id').value,
            formGroup.get('descricao').value,
            formGroup.get('status').value     
        )
    }
}