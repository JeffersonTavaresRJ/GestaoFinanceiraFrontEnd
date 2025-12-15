import { FormGroup } from "@angular/forms";
import { GenericCommand } from "../../../../../shared/_services/commands/generic-cmd";

export class MovimentacaoPrevistaCommandUpdate extends GenericCommand {
    constructor(
        public idItemMovimentacao: number | null = null,
        public dataReferencia: Date | null = null,
        public tipoPrioridade: string | null = null,
        public observacao: string | null = null,  
        public dataVencimento: Date | null = null,
        public valor: number | null = null,
        public status: string | null = null,
        public idFormaPagamento: number | null = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandUpdate{
        return new MovimentacaoPrevistaCommandUpdate(
             Number.parseInt(formGroup.get('idItemMovimentacao')!.value),
             formGroup.get('dataReferencia')!.value,
             formGroup.get('tipoPrioridade')!.value,             
             formGroup.get('observacao')!.value,
             formGroup.get('dataVencimento')!.value,
             Number.parseFloat(formGroup.get('valor')!.value),
             formGroup.get('status')!.value,
             Number.parseInt(formGroup.get('idFormaPagamento')!.value)
         )
     }
}