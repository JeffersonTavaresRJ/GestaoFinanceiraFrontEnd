import { GenericResourceModel } from './generic-resource-model';

export class Usuario extends GenericResourceModel{
    constructor(
        public id?: number,
        public nome: string ='',
        public eMail: string = '',
        public accessToken: string = ''
    ){
        super();
    }
}