import { GenericResourceModel } from "src/app/shared/_models/generic-resource-model";

export class Categoria extends GenericResourceModel{
   constructor(
    public id?: number,
    public descricao: string = '',
    public status?: boolean,
    public idUsuario: number=null
   ){
     super();
   }

   static fromJson(jsonData: any): Categoria {
    return Object.assign(new Categoria(), jsonData);
  }
}