import { FormGroup } from "@angular/forms";
import { DateConvert } from "src/app/shared/functions/date-convert";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class MovimentacaoPrevistaCommandCreate extends GenericCommand {
        
    constructor(
        public idItemMovimentacao: number = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataReferencia: Date = null,
        public dataVencimento: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public nrParcela: number = null,
        public nrParcelaTotal: number = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandCreate{
       return new MovimentacaoPrevistaCommandCreate(
            Number.parseInt(formGroup.get('idItemMovimentacao').value),
            formGroup.get('tipoPrioridade').value,
            formGroup.get('observacao').value,
            new Date(formGroup.get('dataVencimento').value.getFullYear(),
                     formGroup.get('dataVencimento').value.getMonth()+1,
                    0),
            formGroup.get('dataVencimento').value,
            Number.parseFloat(formGroup.get('valor').value),
            Number.parseInt(formGroup.get('idFormaPagamento').value),
            Number.parseInt(formGroup.get('nrParcela').value),
            Number.parseInt(formGroup.get('nrParcelaTotal').value)
        )
    }
}