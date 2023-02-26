import { Component, OnInit } from '@angular/core';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { BSUpdateUsuario } from 'src/app/core/services/bs-update-usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { FechamentoService } from 'src/app/features/lancamentos/_services/fechamento-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dataIni!: Date;
  dataFim!: Date;

  dataIniMenos12Meses!: Date;

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

  ngOnInit(): void {
    this.bsAutenticarUsuario.get().subscribe(valor => this.usuarioAutenticado = valor);
    if (!this.usuarioAutenticado){
      this.resetUser();
    }
    debugger;
    var dataAtual = new Date();
    this.dataIni = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    this.dataFim = new Date(dataAtual.getFullYear(), dataAtual.getMonth()+1, 0);

    this.dataIniMenos12Meses = new Date(dataAtual.getFullYear()-1, dataAtual.getMonth(), 1);

    this.bsUpdateUsuario.getEMail().subscribe(valor => this.user_name = valor);
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
    }

  }