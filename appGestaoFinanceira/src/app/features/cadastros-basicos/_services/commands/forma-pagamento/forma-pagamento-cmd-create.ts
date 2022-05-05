import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class FormaPagamentoCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):FormaPagamentoCommandCreate{
        return new FormaPagamentoCommandCreate(
            formGroup.get('descricao').value
        )
    }
}