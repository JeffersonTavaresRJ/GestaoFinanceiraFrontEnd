import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class CategoriaCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):CategoriaCommandUpdate{
        return new CategoriaCommandUpdate(
            formGroup.get('id').value,
            formGroup.get('descricao').value,
            formGroup.get('status').value            
        )
    }
}