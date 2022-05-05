import { FormGroup } from "@angular/forms";
import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandCreate extends GenericCommand {
        
    constructor(
        public nome: string = null,
        public email: string = null,
        public senha: string = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):UsuarioCommandCreate{
        return new UsuarioCommandCreate(
            formGroup.get('nome').value,
            formGroup.get('eMail').value,
            formGroup.get('senha').value
        )
    }
}