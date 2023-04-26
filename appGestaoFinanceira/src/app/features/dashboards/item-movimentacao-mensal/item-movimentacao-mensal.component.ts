import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-movimentacao-mensal',
  templateUrl: './item-movimentacao-mensal.component.html',
  styleUrls: ['./item-movimentacao-mensal.component.css']
})
export class ItemMovimentacaoMensalComponent implements OnInit {

  arItemMovMensal: any[];

  constructor(private actResourceRoute: ActivatedRoute) { 
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveItemMovMensal: any[] }) => {
                 this.arItemMovMensal = sucess.resolveItemMovMensal;
                 console.log(this.arItemMovMensal);
                        
      }
    );
  }

  ngOnInit(): void {
  }

}
