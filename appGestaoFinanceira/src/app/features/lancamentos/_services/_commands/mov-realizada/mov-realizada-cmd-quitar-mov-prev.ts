import { FormGroup } from "@angular/forms";
import { MovimentacaoRealizadaCommandUpdate } from "./mov-realizada-cmd-update";

export class MovimentacaoRealizadaCommandQuitarMovPrev extends MovimentacaoRealizadaCommandUpdate {
    constructor(
        public movimentacaoRealizada: MovimentacaoRealizadaCommandUpdate,
        public statusMovimentacaoPrevista: string = null
    ) { super(
        movimentacaoRealizada.id,
        movimentacaoRealizada.idItemMovimentacao,
        movimentacaoRealizada.dataReferencia,
        movimentacaoRealizada.tipoPrioridade,
        movimentacaoRealizada.observacao,
        movimentacaoRealizada.dataMovimentacaoRealizada,
        movimentacaoRealizada.valor,
        movimentacaoRealizada.idFormaPagamento,
        movimentacaoRealizada.idConta
    )};

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoRealizadaCommandQuitarMovPrev{
        var movimentacaoRealizadaUpdate= super.convertFormGroupToCommand(formGroup);
        return new MovimentacaoRealizadaCommandQuitarMovPrev(
                   movimentacaoRealizadaUpdate, 
                   formGroup.get('statusMovimentacaoPrevista').value); 
    }
}