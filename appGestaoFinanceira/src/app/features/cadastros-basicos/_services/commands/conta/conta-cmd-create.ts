import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class ContaCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):ContaCommandCreate{
        return new ContaCommandCreate(
            formGroup.get('descricao').value
        )
    }
}