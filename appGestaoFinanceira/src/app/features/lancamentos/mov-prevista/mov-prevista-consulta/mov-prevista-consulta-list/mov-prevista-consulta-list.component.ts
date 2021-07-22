import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoPrevista } from '../../../_models/mov-prevista-model';

@Component({
  selector: 'app-mov-prevista-consulta-list',
  templateUrl: './mov-prevista-consulta-list.component.html',
  styleUrls: ['./mov-prevista-consulta-list.component.css']
})
export class MovPrevistaConsultaListComponent implements OnInit {

  actResourceRoute: ActivatedRoute;

  movimentacoes = [
  {
    dataVencimento:"01/07/2021",
    itemMovimentacao:"Uber",
    categoria:"Transporte",
    tipo:"Despesa",
    valor:"220,23"
  },
  {
    dataVencimento:"01/07/2021",
    itemMovimentacao:"Supermercado",
    categoria:"Alimentação",
    tipo:"Despesa",
    valor:"358,23"
  },
  {
    dataVencimento:"08/07/2021",
    itemMovimentacao:"Energia Elétrica",
    categoria:"Despesas Fixas",
    tipo:"Despesa",
    valor:"147,23"
  },
  {
    dataVencimento:"09/07/2021",
    itemMovimentacao:"Água e Esgotos",
    categoria:"Despesas Fixas",
    tipo:"Despesa",
    valor:"58,23"
  },
  {
    dataVencimento:"10/07/2021",
    itemMovimentacao:"Internet",
    categoria:"Despesas Fixas",
    tipo:"Despesa",
    valor:"88,23"
  },
  {
    dataVencimento:"11/07/2021",
    itemMovimentacao:"Supermercado",
    categoria:"Alimentação",
    tipo:"Despesa",
    valor:"358,23"
  },
  {
    dataVencimento:"12/07/2021",
    itemMovimentacao:"Supermercado",
    categoria:"Alimentação",
    tipo:"Despesa",
    valor:"358,23"
  }
];

  movPrevistas: MovimentacaoPrevista[];
  
  constructor(protected injector: Injector) { 
    this.actResourceRoute = injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.movPrevistaList();
  }

  movPrevistaList(){
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveResources:MovimentacaoPrevista[]})=>{
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.movPrevistas=sucess.resolveResources
      }
    );   
  }

}
