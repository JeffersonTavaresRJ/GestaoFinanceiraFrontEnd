import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Categoria } from "../../../_models/categoria-model";

export class CategoriaCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertModelToCommand(categoria: Categoria):CategoriaCommandDelete{
        return new CategoriaCommandDelete(
            categoria.id            
        )
    }
}