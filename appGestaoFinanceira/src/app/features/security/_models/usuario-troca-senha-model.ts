import { GenericResourceModel } from '../../../shared/_models/generic-resource-model';

export class UsuarioTrocaSenha extends GenericResourceModel{
    constructor(
        id?: number,
        senhaAtual: string = '',
        senha: string = '',
        confirmarSenha: string=''
    ){
        super();
    }

    static fromJson(jsonData: any): UsuarioTrocaSenha {
        return Object.assign(new UsuarioTrocaSenha(), jsonData);
    }
}