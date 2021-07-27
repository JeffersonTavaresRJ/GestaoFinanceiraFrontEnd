import { Component, OnInit } from '@angular/core';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { BSUpdateUsuario } from 'src/app/core/services/bs-update-usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dataIni: Date;
  dataFim: Date;

  constructor(
    private bsAutenticarUsuario: BSAutenticarUsuario,
    private bsUpdateUsuario: BSUpdateUsuario,
    private router: Router) { }

  usuarioAutenticado: boolean;
  user: Usuario;
  user_name: string;

  ngOnInit(): void {
    this.bsAutenticarUsuario.get().subscribe(valor => this.usuarioAutenticado = valor);
    if (!this.usuarioAutenticado){
      this.resetUser();
    }
    this.setDataParamMovimentacoes();
    this.bsUpdateUsuario.getEMail().subscribe(valor => this.user_name = valor);
  }

  setDataParamMovimentacoes(){
    /*parâmetros da lista de Movimentações (Previstas e Realizadas)
     data inicial e final dentro do mês corrente..
    */
    const dataAtual = new Date();
    var mes = dataAtual.getMonth();
    var ano = dataAtual.getFullYear();
    this.dataIni = new Date(ano, mes, 1);
    this.dataFim = new Date(ano, mes + 1, 0);
  }

  resultEvent(event) {
    if (event) {
       this.resetUser();
       this.router.navigate(['/login']);
      }
    }

    resetUser(){
      this.usuarioAutenticado=false;
      window.localStorage.removeItem(environment.keyUser);
    }

  }