import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class ItemMovimentacaoCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null,
        public tipo: string = null,
        public idCategoria: number = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):ItemMovimentacaoCommandCreate{
        return new ItemMovimentacaoCommandCreate(
            formGroup.get('descricao').value,
            formGroup.get('tipo').value,
            formGroup.get('idCategoria').value
        )
    }
}