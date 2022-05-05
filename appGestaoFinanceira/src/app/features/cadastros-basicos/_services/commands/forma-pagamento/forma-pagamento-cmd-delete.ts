import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class FormaPagamentoCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):FormaPagamentoCommandDelete{
        return new FormaPagamentoCommandDelete(
            formGroup.get('id').value           
        )
    }
}