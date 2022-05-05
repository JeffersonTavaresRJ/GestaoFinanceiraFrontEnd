import { FormGroup } from "@angular/forms";
import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandUpdate extends GenericCommand {
        
    constructor(
        public id: number = null,
        public nome: string = null,
        public email: string = null,
        public senha: string = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):UsuarioCommandUpdate{
        return new UsuarioCommandUpdate(
            formGroup.get('id').value,
            formGroup.get('nome').value,
            formGroup.get('eMail').value,
            formGroup.get('senha').value
        )
    }
}