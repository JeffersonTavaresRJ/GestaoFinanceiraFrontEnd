import { FormGroup } from "@angular/forms";
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
        public nrParcelaTotal: number
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoPrevistaCommandCreate{
       return new MovimentacaoPrevistaCommandCreate(
            formGroup.get('idItemMovimentacao').value,
            formGroup.get('tipoPrioridade').value,
            formGroup.get('observacao').value,
            new Date(formGroup.get('dataVencimento').value.getFullYear(),
                     formGroup.get('dataVencimento').value.getMonth()+1,
                    0),
            formGroup.get('dataVencimento').value,
            formGroup.get('valor').value,
            formGroup.get('idFormaPagamento').value,
            formGroup.get('nrParcela').value,
            formGroup.get('nrParcelaTotal').value
        )
    }
}