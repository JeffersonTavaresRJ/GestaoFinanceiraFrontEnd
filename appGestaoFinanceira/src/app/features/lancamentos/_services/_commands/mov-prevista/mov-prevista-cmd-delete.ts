import { FormGroup } from "@angular/forms";
import { GenericCommand } from "../../../../../shared/_services/commands/generic-cmd";

export class MovimentacaoPrevistaCommandDelete extends GenericCommand {
    constructor(
        public id: number
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandDelete{
        return new MovimentacaoPrevistaCommandDelete(
             Number.parseInt(formGroup.get('id')!.value)
         )
     }
}