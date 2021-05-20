import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";

export class FormaPagamento extends GenericResourceModel {
    constructor(
        public id?: number,
        public descricao: string = '',
        public status?: boolean,
        public idUsuario: number = null
    ) {
        super();
    }

    static fromJson(jsonData: any): FormaPagamento {
        return Object.assign(new FormaPagamento(), jsonData);
    }

}