import { GenericCommand } from "src/app/shared/_services/commands/generic-cmd";
import { Conta } from "../../../_models/conta-model";

export class ContaCommandUpdate extends GenericCommand {
    constructor(
        public id: number=null,
        public descricao: string = null,
        public status: boolean = null,
        public idUsuario: number = null
    ) { super(); };

    static convertModelToCommand(conta: Conta):ContaCommandUpdate{
        return new ContaCommandUpdate(
            conta.id,
            conta.descricao,
            conta.status,
            conta.idUsuario            
        )
    }
}