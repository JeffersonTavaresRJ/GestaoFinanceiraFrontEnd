import { FormGroup } from "@angular/forms";
import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { MovimentacaoRealizada } from "../../../_models/mov-realizada-model.";


export class MovimentacaoRealizadaCommandUpdate extends GenericCommand {
    constructor(
        public id: number = null,
        public idItemMovimentacao: number = null,
        public dataReferencia: Date = null,
        public tipoPrioridade: string = null,
        public observacao: string = null,
        public dataMovimentacaoRealizada: Date = null,
        public valor: number = null,
        public idFormaPagamento: number = null,
        public idConta: number = null
    ) { super(); };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoRealizadaCommandUpdate{
        return new MovimentacaoRealizadaCommandUpdate(
            Number.parseInt(formGroup.get('id').value),
            Number.parseInt(formGroup.get('idItemMovimentacao').value),
            new Date(formGroup.get('dataMovimentacaoRealizada').value.getFullYear(),
                     formGroup.get('dataMovimentacaoRealizada').value.getMonth()+1,
                    0),
            formGroup.get('tipoPrioridade').value,
            formGroup.get('observacao').value,            
            formGroup.get('dataMovimentacaoRealizada').value,
            Number.parseFloat(formGroup.get('valor').value),
            Number.parseInt(formGroup.get('idFormaPagamento').value),
            Number.parseInt(formGroup.get('idConta').value)
        );
    }
}