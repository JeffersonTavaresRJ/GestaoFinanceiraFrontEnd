import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsBusinessModule } from '../components/components-business-module';
import{ NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import { ContaFormComponent } from './conta/conta-form/conta-form.component';
import { ContaListComponent } from './conta/conta-list/conta-list.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/forma-pagamento-form/forma-pagamento-form.component';
import { FormaPagamentoListComponent } from './forma-pagamento/forma-pagamento-list/forma-pagamento-list.component';
import { ItemMovimentacaoFormComponent } from './item-movimentacao/item-movimentacao-form/item-movimentacao-form.component';
import { ItemMovimentacaoListComponent } from './item-movimentacao/item-movimentacao-list/item-movimentacao-list.component';

@NgModule({
  declarations: [CategoriaFormComponent, CategoriaListComponent, ContaFormComponent, ContaListComponent, FormaPagamentoFormComponent, FormaPagamentoListComponent, ItemMovimentacaoFormComponent, ItemMovimentacaoListComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ComponentsBusinessModule,
    NgxPaginationModule,
    Ng2OrderModule
  ]
})
export class CadastrosBasicosModule { }
