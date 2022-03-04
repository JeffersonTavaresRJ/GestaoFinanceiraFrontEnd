import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Conta } from "../../../_models/conta-model";

export class ContaCommandCreate extends GenericCommand {
    constructor(
        public descricao: string = null
    ) { super();  };

    static convertModelToCommand(conta: Conta):ContaCommandCreate{
        return new ContaCommandCreate(
            conta.descricao
        )
    }
}