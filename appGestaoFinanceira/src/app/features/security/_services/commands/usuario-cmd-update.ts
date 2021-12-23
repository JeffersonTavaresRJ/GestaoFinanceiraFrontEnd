import { Usuario } from "src/app/features/security/_models/usuario-model";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class UsuarioCommandUpdate extends GenericCommand {
        
    constructor(
        public id: number = null,
        public nome: string = null,
        public email: string = null,
        public senha: string = null
    ) { super();  };

    static convertModelToCommand(usuario: Usuario):UsuarioCommandUpdate{
        return new UsuarioCommandUpdate(
            usuario.id,
            usuario.nome,
            usuario.eMail,
            usuario.senha
        )
    }
}