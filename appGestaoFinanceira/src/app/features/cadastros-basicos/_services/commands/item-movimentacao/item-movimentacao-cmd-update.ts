import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { ItemMovimentacao } from "../../../_models/item-movimentacao-model";


export class ItemMovimentacaoCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public tipo: string = null,
        public status: boolean = null,
        public idCategoria: number = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):ItemMovimentacaoCommandUpdate{
        return new ItemMovimentacaoCommandUpdate(
            formGroup.get('id').value,
            formGroup.get('descricao').value,
            formGroup.get('tipo').value,
            formGroup.get('status').value,
            formGroup.get('idCategoria').value      
        )
    }
}