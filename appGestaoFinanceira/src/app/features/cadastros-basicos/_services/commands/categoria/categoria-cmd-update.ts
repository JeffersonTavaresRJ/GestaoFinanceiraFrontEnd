import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Categoria } from "../../../_models/categoria-model";

export class CategoriaCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null
    ) { super(); };

    static convertModelToCommand(categoria: Categoria):CategoriaCommandUpdate{
        return new CategoriaCommandUpdate(
            categoria.id,
            categoria.descricao,
            categoria.status            
        )
    }
}