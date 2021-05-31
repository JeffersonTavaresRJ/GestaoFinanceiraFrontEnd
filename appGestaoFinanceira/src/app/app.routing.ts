//importando a biblioteca padrão do Angular
import { NgModule } from '@angular/core';

//importando as bibliotecas de rotas do angular
import { Routes, RouterModule } from '@angular/router';

//importando os componentes que iremos mapear
import { LoginFormComponent } from './features/security/login-form/login-form.component';
import { UsuarioFormCreateComponent } from './features/security/usuario-form-create/usuario-form-create.component';
import { UsuarioFormDeleteComponent} from './features/security/usuario-form-delete/usuario-form-delete.component';
import { ReceitasDespesasDashboardComponent } from './features/dashboards/receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { CategoriaListComponent } from './features/cadastros-basicos/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './features/cadastros-basicos/categoria/categoria-form/categoria-form.component';
import { ContaListComponent } from './features/cadastros-basicos/conta/conta-list/conta-list.component';
import { ContaFormComponent } from './features/cadastros-basicos/conta/conta-form/conta-form.component';
import { UsuarioFormUpdateComponent } from './features/security/usuario-update/usuario-form-update/usuario-form-update.component';
import { FormaPagamentoFormComponent } from './features/cadastros-basicos/forma-pagamento/forma-pagamento-form/forma-pagamento-form.component';
import { FormaPagamentoListComponent } from './features/cadastros-basicos/forma-pagamento/forma-pagamento-list/forma-pagamento-list.component';
import { ItemMovimentacaoListComponent } from './features/cadastros-basicos/item-movimentacao/item-movimentacao-list/item-movimentacao-list.component';
import { ItemMovimentacaoFormComponent } from './features/cadastros-basicos/item-movimentacao/item-movimentacao-form/item-movimentacao-form.component';
import { CategoriaListResolver } from './features/cadastros-basicos/_guards/categoria-list-resolver';
import { ContaListResolver } from './features/cadastros-basicos/_guards/conta-list-resolver';
import { FormaPagamentoListResolver } from './features/cadastros-basicos/_guards/forma-pagamento-list-resolver';
import { ItemMovimentacaoListResolver } from './features/cadastros-basicos/_guards/item-movimentacao-list-resolver';


//criando o mapeamento de rotas dos componentes
const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'login', component: LoginFormComponent },    
    { path: 'usuario/new', component: UsuarioFormCreateComponent },
    { path: 'usuario/edit/null', component: UsuarioFormUpdateComponent},
    { path: 'usuario/delete', component: UsuarioFormDeleteComponent },
    { path: 'categoria', component: CategoriaListComponent, 
             resolve: {resolveResources: CategoriaListResolver} },
    { path: 'categoria/new', component: CategoriaFormComponent },
    { path: 'categoria/edit/:id', component: CategoriaFormComponent },
    { path: 'conta', component: ContaListComponent,
             resolve: {resolveResources: ContaListResolver} },
    { path: 'conta/new', component: ContaFormComponent },
    { path: 'conta/edit/:id', component: ContaFormComponent },
    { path: 'forma-pagamento', component: FormaPagamentoListComponent,
             resolve:{resolveResources: FormaPagamentoListResolver} },
    { path: 'forma-pagamento/new', component: FormaPagamentoFormComponent },
    { path: 'forma-pagamento/edit/:id', component: FormaPagamentoFormComponent },
    { path: 'item-movimentacao', component: ItemMovimentacaoListComponent,
             resolve:{resolveResources: ItemMovimentacaoListResolver}  },
    { path: 'item-movimentacao/new', component: ItemMovimentacaoFormComponent },
    { path: 'item-movimentacao/edit/:id', component: ItemMovimentacaoFormComponent },
    { path: 'receitas-despesas-dashboard', component: ReceitasDespesasDashboardComponent }
];

//registrando o mapeamento no Angular
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[CategoriaListResolver,
               ContaListResolver,
               FormaPagamentoListResolver,
               ItemMovimentacaoListResolver]
})

export class AppRoutingModule { }
