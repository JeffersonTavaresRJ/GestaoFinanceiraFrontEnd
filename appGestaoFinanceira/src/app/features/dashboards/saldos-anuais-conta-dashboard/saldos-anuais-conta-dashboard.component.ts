import { Component, OnInit } from '@angular/core';
import { Conta } from '../../cadastros-basicos/_models/conta-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saldos-anuais-conta-dashboard',
  templateUrl: './saldos-anuais-conta-dashboard.component.html',
  styleUrls: ['./saldos-anuais-conta-dashboard.component.css']
})
export class SaldosAnuaisPorContaDashBoardComponent implements OnInit {
  arSaldos: any[];
  arContas: Conta[];

  constructor(private actResourceRoute: ActivatedRoute) { 
    this.actResourceRoute.data.subscribe(
      (sucess: { resolveSaldoPeriodoConta: any[] }) => {
                 this.arSaldos = sucess.resolveSaldoPeriodoConta;
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
