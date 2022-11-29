import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasDespesasDashboardComponent } from './receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ReceitasDespesasDashboardComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class DashboardsModule { }
