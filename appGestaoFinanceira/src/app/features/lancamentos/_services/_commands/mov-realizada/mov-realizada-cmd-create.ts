import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";

export class MovimentacaoRealizadaCommandCreate extends GenericCommand {
    constructor(
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataMovimentacaoRealizada: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public idConta: number = null
    ) { super();  };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoRealizadaCommandCreate{
        return new MovimentacaoRealizadaCommandCreate(
            formGroup.get('idItemMovimentacao').value,
            new Date(formGroup.get('dataMovimentacaoRealizada').value.getFullYear(),
                     formGroup.get('dataMovimentacaoRealizada').value.getMonth()+1,
                    0),
            formGroup.get('tipoPrioridade').value,
            formGroup.get('observacao').value,            
            formGroup.get('dataMovimentacaoRealizada').value,
            formGroup.get('valor').value,
            formGroup.get('idFormaPagamento').value,
            formGroup.get('idConta').value
        );
    }
}