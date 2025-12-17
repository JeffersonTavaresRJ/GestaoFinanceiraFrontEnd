import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoPrevista } from "../../../_models/mov-prevista-model";

export class MovimentacaoPrevistaCommandUpdate extends GenericCommand {
    constructor(
        public id: number = null,
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,  
        public dataVencimento: Date = null,
        public valor: number = null,
        public status: string = null,
        public idFormaPagamento: number = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandUpdate{
        return new MovimentacaoPrevistaCommandUpdate(
             Number.parseInt(formGroup.get('id').value),
             Number.parseInt(formGroup.get('idItemMovimentacao').value),
             formGroup.get('dataReferencia').value,
             formGroup.get('tipoPrioridade').value,             
             formGroup.get('observacao').value,
             formGroup.get('dataVencimento').value,
             Number.parseFloat(formGroup.get('valor').value),
             formGroup.get('status').value,
             Number.parseInt(formGroup.get('idFormaPagamento').value)
         )
     }
}