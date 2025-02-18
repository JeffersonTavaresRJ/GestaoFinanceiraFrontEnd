import { FormGroup } from "@angular/forms";
import { MovimentacaoRealizadaCommandUpdate } from "./mov-realizada-cmd-update";

export class MovimentacaoRealizadaCommandQuitarMovPrev extends MovimentacaoRealizadaCommandUpdate {

    static result: MovimentacaoRealizadaCommandUpdate;
    
    constructor(public statusMovimentacaoPrevista: string = null){
        super();
    };

    static convertFormGroupToCommand(formGroup: FormGroup):MovimentacaoRealizadaCommandQuitarMovPrev{
        var s = super.convertFormGroupToCommand(formGroup);
        var r = new MovimentacaoRealizadaCommandQuitarMovPrev(formGroup.get('statusMovimentacaoPrevista').value);
        r.dataMovimentacaoRealizada = s.dataMovimentacaoRealizada;
        r.dataReferencia = s.dataReferencia;
        r.id = s.id;
        r.idConta = s.idConta;
        r.idFormaPagamento = s.idFormaPagamento;
        r.idItemMovimentacao = s.idItemMovimentacao;
        r.observacao = s.observacao;
        r.tipoPrioridade = s.tipoPrioridade;
        r.valor = s.valor;
        return r;
    }
}