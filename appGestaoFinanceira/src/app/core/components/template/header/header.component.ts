import { Component, OnInit } from '@angular/core';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { BSUpdateUsuario } from 'src/app/core/services/bs-update-usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dataIni!: Date;
  dataFim!: Date;

  dataIniMenos13Meses!: Date;
  dataFimMais12Meses!:Date;
  dataFechamentoIni!:Date;
  dataFechamentoFim!:Date;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private bsAutenticarUsuario: BSAutenticarUsuario,
    private bsUpdateUsuario: BSUpdateUsuario,
    private router: Router) {
     }

  usuarioAutenticado: boolean = false;
  user!: Usuario;
  user_name!: string;
  anoInicial:number;
  anoFinal:number;

  ngOnInit(): void {
    this.bsAutenticarUsuario.get().subscribe(valor => this.usuarioAutenticado = valor);
    if (!this.usuarioAutenticado){
      this.resetUser();
    }
    debugger;
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var mesAtual = dataAtual.getMonth();

    this.anoInicial = anoAtual-5;
    this.anoFinal = anoAtual;    

    this.dataIni = new Date(anoAtual, mesAtual, 1);
    this.dataFim = new Date(anoAtual, mesAtual+1, 0);


    this.dataIniMenos13Meses = new Date(anoAtual-1, mesAtual==0 ? 11 : mesAtual-1, 1);
    this.dataFimMais12Meses  = new Date(anoAtual+1, mesAtual+1, 0);

    this.bsUpdateUsuario.getEMail().subscribe(valor =>{
      this.user_name = valor
    });
  }

  resultEvent(event: any) {
    if (event) {
       this.resetUser();
       this.router.navigate(['/login']);
      }
    }

  resetUser(){
      this.usuarioAutenticado=false;
      window.localStorage.removeItem(environment.keyUser);
      window.localStorage.removeItem(environment.keyParamListMovPre);
    }

  }