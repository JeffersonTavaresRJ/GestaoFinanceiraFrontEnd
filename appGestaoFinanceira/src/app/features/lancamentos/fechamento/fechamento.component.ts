import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateConvert } from 'src/app/shared/functions/date-convert';
import { MovimentacaoPrevista } from '../_models/mov-prevista-model';

@Component({
  selector: 'app-fechamento',
  templateUrl: './fechamento.component.html',
  styleUrls: ['./fechamento.component.css']
})
export class FechamentoComponent implements OnInit {

  title:string;
  paginaAtual:number=1;
  arMovPrevistas: MovimentacaoPrevista[];
  arMovRealizadas: any[];

  constructor(protected activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    debugger;
    var dataFim = this.activatedRoute.snapshot.params.dataFim;
    this.title = "Fechamento Mensal: " + DateConvert.formatDateMMYYYY(dataFim, '/');
    this.movPrevistaList();
    this.movRealizadaGroupByConta();
  }

  private movPrevistaList() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovPrev: MovimentacaoPrevista[] }) => {
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovPrevistas = sucess.resolveFechamentoMovPrev;

      }
    );
  }

  private movRealizadaGroupByConta() {
    this.activatedRoute.data.subscribe(
      (sucess: { resolveFechamentoMovReal: any[] }) => {
        debugger;
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.arMovRealizadas = sucess.resolveFechamentoMovReal;

      }
    );
  }

}
