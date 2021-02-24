import { GenericResourceModel } from './generic-resource-model';

export class Categoria extends GenericResourceModel{
   constructor(
    public id?: number,
    public descricao: string = '',
    public tipo: string = '',
    public status: string = '',
    public nomeApi: string = 'Categoria'
   ){
       super();
   }
}