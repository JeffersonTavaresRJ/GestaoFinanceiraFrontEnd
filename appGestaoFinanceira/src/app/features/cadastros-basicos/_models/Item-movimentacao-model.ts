import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";
import { Categoria } from "./categoria-model";

export class ItemMovimentacao extends GenericResourceModel{
    constructor(
        id?: number,
        public descricao: string='',
        public tipo: string='',
        public status?: boolean,
        public idCategoria: number=null,
        public categoria: Categoria = new Categoria()
    ){
        super();
    }
/*
    static fromJson(jsonData: any): ItemMovimentacao {
       return Object.assign(new ItemMovimentacao(), jsonData);
      }
      */
}