import { Component, OnInit } from '@angular/core';
import { ItemMovimentacao } from '../../cadastros-basicos/_models/item-movimentacao-model';
import { ItemMovimentacaoService } from '../../cadastros-basicos/_services/item-movimentacao-service';

@Component({
  selector: 'app-receitas-despesas-dashboard',
  templateUrl: './receitas-despesas-dashboard.component.html',
  styleUrls: ['./receitas-despesas-dashboard.component.css']
})
export class ReceitasDespesasDashboardComponent implements OnInit {

  constructor(private itemMovimentacaoService : ItemMovimentacaoService) { }
 
  ngOnInit(): void {
   /* this.itemMovimentacaoService.setApiOption('/GetId');
    this.itemMovimentacaoService.getById(6).subscribe(
      sucess=> alert(JSON.stringify(sucess))
      );
      */
  }

}
