import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoItemMovimentacaoComponent } from './dropdowns/tipo-item-movimentacao/tipo-item-movimentacao.component';

@NgModule({
  declarations: [TipoItemMovimentacaoComponent],
  imports: [
    CommonModule    
  ],
  exports:[
    TipoItemMovimentacaoComponent
  ]
})
export class ComponentsBusinessModule { }