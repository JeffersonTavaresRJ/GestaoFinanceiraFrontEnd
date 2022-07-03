import { FormGroup } from "@angular/forms";
import { DateConvert } from "src/app/shared/functions/date-convert";
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
        var dataMovimentacaoRealizada = formGroup.get('dataMovimentacaoRealizada').value;
        //var dataMovimentacaoRealizada = DateConvert.stringToDate(formGroup.get('dataMovimentacaoRealizada').value, '/');
        //if (dataMovimentacaoRealizada == null){
          //  dataMovimentacaoRealizada = DateConvert.stringToDate(formGroup.get('dataMovimentacaoRealizada').value, '-');
       // }
        
        return new MovimentacaoRealizadaCommandCreate(
            Number.parseInt(formGroup.get('idItemMovimentacao').value),
            new Date(dataMovimentacaoRealizada.getFullYear(),
                     dataMovimentacaoRealizada.getMonth()+1,
                    0),
            formGroup.get('tipoPrioridade').value,
            formGroup.get('observacao').value,            
            dataMovimentacaoRealizada,
            Number.parseFloat(formGroup.get('valor').value),
            Number.parseInt(formGroup.get('idFormaPagamento').value),
            Number.parseInt(formGroup.get('idConta').value)
        );
    }
}