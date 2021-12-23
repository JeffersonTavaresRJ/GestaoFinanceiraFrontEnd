import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { FormaPagamento } from "../../../_models/forma-pagamento";

export class FormaPagamentoCommandDelete extends GenericCommand {
    constructor(
        public id: number=null
    ) { super(); };

    static convertModelToCommand(formaPagamento: FormaPagamento):FormaPagamentoCommandDelete{
        return new FormaPagamentoCommandDelete(
            formaPagamento.id            
        )
    }
}