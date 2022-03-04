import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { FormaPagamento } from "../../../_models/forma-pagamento";

export class FormaPagamentoCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null
    ) { super(); };

    static convertModelToCommand(formaPagamento: FormaPagamento):FormaPagamentoCommandUpdate{
        return new FormaPagamentoCommandUpdate(
            formaPagamento.id,
            formaPagamento.descricao,
            formaPagamento.status            
        )
    }
}