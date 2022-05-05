import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class ItemMovimentacaoCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):ItemMovimentacaoCommandDelete{
        return new ItemMovimentacaoCommandDelete(
            formGroup.get('id').value      
        )
    }
}