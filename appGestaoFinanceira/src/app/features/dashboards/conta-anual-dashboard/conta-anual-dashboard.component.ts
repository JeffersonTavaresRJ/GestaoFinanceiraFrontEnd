import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoRealizada } from '../../lancamentos/_models/mov-realizada-model.';
import { Conta } from '../../cadastros-basicos/_models/conta-model';

@Component({
  selector: 'app-conta-anual-dashboard',
  templateUrl: './conta-anual-dashboard.component.html',
  styleUrls: ['./conta-anual-dashboard.component.css']
})
export class ContaAnualDashboardComponent implements OnInit {
  arSaldos: any[];
  arContas: Conta[];

  constructor(private actResourceRoute: ActivatedRoute) { 
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveSaldoConta: any[] }) => {
                 this.arSaldos = sucess.resolveSaldoConta;
                 console.log(this.arSaldos);
                        
      }
    );
    
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveConta: Conta[] }) => {
                 this.arContas = sucess.resolveConta;  
      }
    );

  }

  ngOnInit(): void {
  }

}
