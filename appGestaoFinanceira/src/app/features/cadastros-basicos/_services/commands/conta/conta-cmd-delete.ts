import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class ContaCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):ContaCommandDelete{
        return new ContaCommandDelete(
            formGroup.get('id').value           
        )
    }
}