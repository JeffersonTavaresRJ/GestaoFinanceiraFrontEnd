import { FormGroup } from "@angular/forms";
import { GenericCommand } from "../../../../../shared/_services/commands/generic-cmd";

export class MovimentacaoPrevistaCommandCreate extends GenericCommand {
        
    constructor(
        public idItemMovimentacao: number | null = null,
        public tipoPrioridade: string | null = null,
        public observacao: string | null = null,
        public dataReferencia: Date | null = null,
        public dataVencimento: Date | null = null,
        public valor: number | null = null,
        public idFormaPagamento: number | null = null,
        public nrParcela: number | null = null,
        public nrParcelaTotal: number | null = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandCreate{
       return new MovimentacaoPrevistaCommandCreate(
            Number.parseInt(formGroup.get('idItemMovimentacao')!.value),
            formGroup.get('tipoPrioridade')!.value,
            formGroup.get('observacao')!.value,
            new Date(formGroup.get('dataVencimento')!.value.getFullYear(),
                     formGroup.get('dataVencimento')!.value.getMonth()+1,
                    0),
            formGroup.get('dataVencimento')!.value,
            Number.parseFloat(formGroup.get('valor')!.value),
            Number.parseInt(formGroup.get('idFormaPagamento')!.value),
            Number.parseInt(formGroup.get('nrParcela')!.value),
            Number.parseInt(formGroup.get('nrParcelaTotal')!.value)
        )
    }
}