import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoPrevista } from '../../lancamentos/_models/mov-prevista-model';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';

@Component({
  selector: 'app-receitas-despesas-anual-dashboard',
  templateUrl: './receitas-despesas-anual-dashboard.component.html',
  styleUrls: ['./receitas-despesas-anual-dashboard.component.css']
})
export class ReceitasDespesasAnualDashboardComponent implements OnInit {

  arMovPrev: MovimentacaoPrevista[]=[];
  arMovReal: MovimentacaoRealizada[]=[];

  constructor(private actResourceRoute: ActivatedRoute) {

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovPrev: MovimentacaoPrevista[] }) => {
                 this.arMovPrev = sucess.resolveMovPrev;
                        
      }
    );

    this.actResourceRoute.data.subscribe(
      (sucess: { resolveMovReal: MovimentacaoRealizada[] }) => {
                 this.arMovReal = sucess.resolveMovReal;
                        
      }
    );
    
   }

  ngOnInit(): void {
  }

}
