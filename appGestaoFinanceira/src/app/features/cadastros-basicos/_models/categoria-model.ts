import { GenericResourceModel } from '../../../shared/_models/generic-resource-model';

export class Categoria extends GenericResourceModel{
   constructor(
    public id?: number,
    public descricao: string = '',
    public tipo: string = '',
    public status?: string,
    public idUsuario: number=null
   ){
       super();
   }
}