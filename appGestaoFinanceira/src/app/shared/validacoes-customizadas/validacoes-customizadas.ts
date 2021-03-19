import {AbstractControl} from '@angular/forms';

export class ValidacoesCustomizadas{
    
    static validarConfirmacaoSenha(control: AbstractControl){
        let senha = control.get('senha').value;
        let confirmarSenha = control.get('confirmarSenha').value;

        if(senha === confirmarSenha)return null;

        control.get('confirmarSenha').setErrors({senhasNaoConferem:true});
    }
}