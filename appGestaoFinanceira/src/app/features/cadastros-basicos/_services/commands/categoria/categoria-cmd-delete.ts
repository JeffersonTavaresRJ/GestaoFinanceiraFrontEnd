import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class CategoriaCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):CategoriaCommandDelete{
        return new CategoriaCommandDelete(
            formGroup.get('id').value          
        )
    }
}