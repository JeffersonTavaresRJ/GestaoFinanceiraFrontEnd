import { AbstractControl } from '@angular/forms';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { UsuarioService } from '../../features/security/_services/usuario-service';

export class ValidacoesCustomizadas {

    private static usuario: Usuario;

    static validarConfirmacaoSenha(control: AbstractControl):any {
        let senha = control.get('senha')?.value;
        let confirmarSenha = control.get('confirmarSenha')?.value;
        control.get('confirmarSenha')?.setErrors(null);

        if (senha === confirmarSenha) { return null; }

        return control.get('confirmarSenha')?.setErrors({ senhasNaoConferem: true, message: 'Senhas não conferem' });
    }

    static validarSenha(usuarioService: UsuarioService) {

        return (control: AbstractControl) => {
            let senha = control.get('senha')?.value;
            let confirmarSenha = control.get('confirmarSenha')?.value;
            let email = control.get('eMail')?.value;
            //  console.log('validando..');

            if (senha === confirmarSenha && (confirmarSenha != null && confirmarSenha.length > 0)) {
                this.usuario = Usuario.setCredentials(email=email, senha=senha);

                //console.log('chamando api..: '+this.usuario);
                control.get('confirmarSenha')?.setErrors({ senhaInvalida: true, message: 'Validando usuário/senha...' });

                usuarioService.autenthicate(this.usuario).subscribe(
                    success => {                        
                        control.get('confirmarSenha')?.setErrors(null);
                        return null;
                    },
                    (errors: any) => {
                        if (errors.status == 0) {
                            //  console.log('erro servidor!');
                            control.get('confirmarSenha')?.setErrors({ senhaInvalida: true, message: 'Erro no servidor' });
                        }
                        else if (errors.status == 400) {
                            //   console.log('senha inválida!');
                            control.get('confirmarSenha')?.setErrors({ senhaInvalida: true, message: 'Senha inválida' });
                        } else {
                            //  console.log(errors.error);
                            control.get('confirmarSenha')?.setErrors({ senhaInvalida: true, message: errors.error });
                        }
                    }
                )
            }
            return null;
        }
    }
}