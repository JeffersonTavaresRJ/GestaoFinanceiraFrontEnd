import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class MovimentacaoPrevistaCommandDelete extends GenericCommand {
    constructor(
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandDelete{
        return new MovimentacaoPrevistaCommandDelete(
             formGroup.get('idItemMovimentacao').value,
             formGroup.get('dataReferencia').value
         )
     }
}