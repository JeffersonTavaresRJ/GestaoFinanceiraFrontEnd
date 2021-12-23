import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandCreate extends GenericCommand {
        
    constructor(
        public nome: string = null,
        public email: string = null,
        public senha: string = null
    ) { super();  };

    static convertModelToCommand(usuario: Usuario):UsuarioCommandCreate{
        return new UsuarioCommandCreate(
            usuario.nome,
            usuario.eMail,
            usuario.senha
        )
    }
}