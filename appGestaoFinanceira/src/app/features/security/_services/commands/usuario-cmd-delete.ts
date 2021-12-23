import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandDelete extends GenericCommand {
        
    constructor(
        public id: number = null
    ) { super();  };

    static convertModelToCommand(usuario: Usuario):UsuarioCommandDelete{
        return new UsuarioCommandDelete(
            usuario.id
        )
    }
}