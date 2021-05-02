import { GenericResourceModel } from '../../../shared/_models/generic-resource-model';

export class Categoria extends GenericResourceModel{
   constructor(
    public id?: number,
    public descricao: string = '',
    public status?: string,
    public idUsuario: number=null
   ){
       super();
   }

   static fromJson(jsonData: any): Categoria {
    return Object.assign(new Categoria(), jsonData);
  }
}