import { GenericResourceModel } from '../../../shared/_models/generic-resource-model';

export class Usuario extends GenericResourceModel{
    constructor(
        public id?: number,
        public nome: string ='',
        public eMail: string = '',
        public senha: string = '',
        public accessToken: string = ''
    ){
        super();
    }

    static fromJson(jsonData: any): Usuario {
        return Object.assign(new Usuario(), jsonData);
    }
}