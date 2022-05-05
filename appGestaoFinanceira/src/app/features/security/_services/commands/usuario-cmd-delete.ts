import { FormGroup } from "@angular/forms";
import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandDelete extends GenericCommand {
        
    constructor(
        public id: number = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):UsuarioCommandDelete{
        return new UsuarioCommandDelete(
            formGroup.get('id').value
        )
    }
}