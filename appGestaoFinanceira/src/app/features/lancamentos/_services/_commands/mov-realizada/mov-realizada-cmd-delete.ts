import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";

export class MovimentacaoRealizadaCommandDelete extends GenericCommand {
    constructor(
        public id: number = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoRealizadaCommandDelete{
        return new MovimentacaoRealizadaCommandDelete(
            Number.parseInt(formGroup.get('id').value)
        );
    }
}