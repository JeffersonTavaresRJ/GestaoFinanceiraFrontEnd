import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Categoria } from "../../../_models/categoria-model";

export class CategoriaCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null
    ) { super();  };

    static convertModelToCommand(categoria: Categoria):CategoriaCommandCreate{
        return new CategoriaCommandCreate(
            categoria.descricao
        )
    }
}