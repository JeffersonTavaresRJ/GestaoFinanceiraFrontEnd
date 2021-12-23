import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { FormaPagamento } from "../../../_models/forma-pagamento";

export class FormaPagamentoCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null,
        public idUsuario: number = null
    ) { super();  };

    static convertModelToCommand(categoria: FormaPagamento):FormaPagamentoCommandCreate{
        return new FormaPagamentoCommandCreate(
            categoria.descricao,
            categoria.idUsuario
        )
    }
}