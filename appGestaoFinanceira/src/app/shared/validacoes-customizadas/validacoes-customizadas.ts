import { AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../features/security/_services/usuario-service';

export class ValidacoesCustomizadas {

    static validarConfirmacaoSenha(control: AbstractControl) {
        let senha = control.get('senha').value;
        let confirmarSenha = control.get('confirmarSenha').value;
        control.get('confirmarSenha').setErrors(null);

        if (senha === confirmarSenha) { return null; }

        control.get('confirmarSenha').setErrors({ senhasNaoConferem: true, message: 'Senhas não conferem' });
    }

    static validarSenha(usuarioService: UsuarioService) {

        return (control: AbstractControl) => {
            let senha = control.get('senha').value;
            let confirmarSenha = control.get('confirmarSenha').value;
            let email = control.get('eMail').value;
            //  console.log('validando..');

            if (senha === confirmarSenha && (confirmarSenha != null && confirmarSenha.length > 0)) {
                var credentials = {
                    email: email,
                    senha: senha
                }
                //   console.log('chamando api..:'+confirmarSenha.length);
                control.get('confirmarSenha').setErrors({ senhaInvalida: true, message: 'Validando usuário/senha...' });

                usuarioService.autenthicate(credentials).subscribe(
                    success => {
                        control.get('confirmarSenha').setErrors(null);
                        return null;
                    },
                    (errors: any) => {
                        if (errors.status == 0) {
                            //  console.log('erro servidor!');
                            control.get('confirmarSenha').setErrors({ senhaInvalida: true, message: 'Erro no servidor' });
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
            return null;
        }
    }
}