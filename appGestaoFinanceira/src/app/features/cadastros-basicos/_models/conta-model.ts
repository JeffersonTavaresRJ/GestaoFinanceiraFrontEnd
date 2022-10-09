import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";

export class Conta extends GenericResourceModel{
    constructor(
        public id?: number,
        public descricao: string = '',
        public status?: boolean,
        public defaultConta:string = 'N'
    ) {
        super();
    }
/*
    static fromJson(jsonData: any): Conta {
        return Object.assign(new Conta(), jsonData);
    }
    */

}