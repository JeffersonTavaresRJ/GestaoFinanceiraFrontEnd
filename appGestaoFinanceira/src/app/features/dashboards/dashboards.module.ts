import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceitasDespesasDashboardComponent } from './receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { PlanRealAnualDashboardComponent } from './plan-real-anual-dashboard/plan-real-anual-dashboard.component';
import { CalendarModule } from 'primeng/calendar';
import { RealPrevAnualDashboardComponent } from './real-prev-anual-dashboard/real-prev-anual-dashboard.component';
import { SaldosMensaisPorContaDashboardComponent } from './saldos-mensais-conta-dashboard/saldos-mensais-conta-dashboard.component';
import { SaldosAnuaisPorContaDashBoardComponent } from './saldos-anuais-conta-dashboard/saldos-anuais-conta-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ItemMovimentacaoMensalComponent } from './item-movimentacao-mensal/item-movimentacao-mensal.component';

@NgModule({
  declarations: [
    ReceitasDespesasDashboardComponent,
    PlanRealAnualDashboardComponent,
    RealPrevAnualDashboardComponent,
    SaldosMensaisPorContaDashboardComponent,
    SaldosAnuaisPorContaDashBoardComponent,
    ItemMovimentacaoMensalComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class DashboardsModule { }
