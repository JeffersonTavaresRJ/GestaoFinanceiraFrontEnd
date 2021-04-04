import { AbstractControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario-resource-service';

export class ValidacoesCustomizadas {

    static validarConfirmacaoSenha(control: AbstractControl) {
        let senha = control.get('senha').value;
        let confirmarSenha = control.get('confirmarSenha').value;

        if (senha === confirmarSenha) return null;

        control.get('confirmarSenha').setErrors({ senhasNaoConferem: true });
    }

    static validarSenha(usuarioService: UsuarioService) {

        return (control: AbstractControl) => {
            let senha = control.get('senha').value;
            let confirmarSenha = control.get('confirmarSenha').value;
            let email = control.get('email').value;
          //  console.log('validando..');

            if (confirmarSenha!=null && confirmarSenha.length > 0 && senha.length === confirmarSenha.length) {
                var credentials = {
                    email: email,
                    senha: senha
                }
             //   console.log('chamando api..:'+confirmarSenha.length);
                usuarioService.autenthicate(credentials).subscribe(
                    success => {
                       // console.log('sucesso!');
                        return null;
                    },
                    (errors: any) => {
                        if (errors.status == 0) {
                          //  console.log('erro servidor!');
                            control.get('confirmarSenha').setErrors({ senhaInvalida: true, message: 'Problema de acesso ao servidor' });
                        }
                        else if (errors.status == 400) {
                         //   console.log('senha inválida!');
                            control.get('confirmarSenha').setErrors({ senhaInvalida: true, message: 'Senha inválida' });
                        } else {
                          //  console.log(errors.error);
                            control.get('confirmarSenha').setErrors({ senhaInvalida: true, message: errors.error });
                        }
                    }
                )
            }            
           // control.get('confirmarSenha').setErrors({ senhaInvalida: false, message: null });
           return null;
        }
    }
}