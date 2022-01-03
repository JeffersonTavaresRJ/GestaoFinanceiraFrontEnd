import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownCategoriaComponent } from './dropdowns/categoria/drpd-categoria.component';
import { DropdownModule } from 'primeng/dropdown';
import { DropDownItemMovimentacaoComponent } from './dropdowns/item-movimentacao/drpd-item-movimentacao.component';
import { DropDownFormaPagamentoComponent } from './dropdowns/forma-pagamento/drpd-forma-pagamento.component';
import { DropDownPrioridadeComponent } from './dropdowns/prioridade/drpd-prioridade.component';



@NgModule({
  declarations: [
    DropDownCategoriaComponent,
    DropDownItemMovimentacaoComponent,
    DropDownFormaPagamentoComponent,
    DropDownPrioridadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  exports:[
    DropDownCategoriaComponent,
    DropDownItemMovimentacaoComponent,
    DropDownFormaPagamentoComponent,
    DropDownPrioridadeComponent]
})
export class ComponentsModule { }
