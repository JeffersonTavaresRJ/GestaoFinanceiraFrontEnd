import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class CategoriaCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):CategoriaCommandCreate{
        return new CategoriaCommandCreate(
            formGroup.get('descricao').value
        )
    }
}