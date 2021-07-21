import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/features/cadastros-basicos/_models/categoria-model';
import { FormaPagamento } from 'src/app/features/cadastros-basicos/_models/forma-pagamento';
import { ItemMovimentacao } from 'src/app/features/cadastros-basicos/_models/item-movimentacao-model';

@Component({
  selector: 'app-mov-prevista-consulta-param',
  templateUrl: './mov-prevista-consulta-param.component.html',
  styleUrls: ['./mov-prevista-consulta-param.component.css']
})
export class MovPrevistaConsultaParamComponent implements OnInit {

  tipos = [];
  prioridades=[];
  categorias: Categoria[]=[];
  itensMovimentacao: ItemMovimentacao[]=[];
  formasPagamento: FormaPagamento[]=[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
