import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceitasDespesasDashboardComponent } from './receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { PlanRealAnualDashboardComponent } from './plan-real-anual-dashboard/plan-real-anual-dashboard.component';
import { CalendarModule } from 'primeng/calendar';
import { RealPrevAnualDashboardComponent } from './real-prev-anual-dashboard/real-prev-anual-dashboard.component';
import { ContaAnualDashboardComponent } from './conta-anual-dashboard/conta-anual-dashboard.component';
import { ContaPeriodoAnualDashboardComponent } from './conta-periodo-anual-dashboard/conta-periodo-anual-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    ReceitasDespesasDashboardComponent,
    PlanRealAnualDashboardComponent,
    RealPrevAnualDashboardComponent,
    ContaAnualDashboardComponent,
    ContaPeriodoAnualDashboardComponent
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
