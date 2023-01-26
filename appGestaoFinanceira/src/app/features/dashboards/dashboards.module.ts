import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasDespesasDashboardComponent } from './receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceitasDespesasAnualDashboardComponent } from './receitas-despesas-anual-dashboard/receitas-despesas-anual-dashboard.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    ReceitasDespesasDashboardComponent,
    ReceitasDespesasAnualDashboardComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule
  ]
})
export class DashboardsModule { }
