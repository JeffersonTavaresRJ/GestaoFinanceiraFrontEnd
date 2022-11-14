//importando a biblioteca padrão do Angular
import { NgModule } from '@angular/core';

//importando as bibliotecas de rotas do angular
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { Error404Component } from './core/components/error404/error404.component';
import { AuthGuard } from './core/security/auth-guard';
import { ReceitasDespesasDashboardComponent } from './features/dashboards/receitas-despesas-dashboard/receitas-despesas-dashboard.component';

//importando os componentes que iremos mapear
import { LoginFormComponent } from './features/security/login-form/login-form.component';
import { UsuarioFormCreateComponent } from './features/security/usuario-form-create/usuario-form-create.component';
import { UsuarioFormDeleteComponent} from './features/security/usuario-form-delete/usuario-form-delete.component';
import { CategoriaListComponent } from './features/cadastros-basicos/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './features/cadastros-basicos/categoria/categoria-form/categoria-form.component';
import { ContaListComponent } from './features/cadastros-basicos/conta/conta-list/conta-list.component';
import { ContaFormComponent } from './features/cadastros-basicos/conta/conta-form/conta-form.component';
import { UsuarioFormUpdateComponent } from './features/security/usuario-update/usuario-form-update/usuario-form-update.component';
import { FormaPagamentoFormComponent } from './features/cadastros-basicos/forma-pagamento/forma-pagamento-form/forma-pagamento-form.component';
import { FormaPagamentoListComponent } from './features/cadastros-basicos/forma-pagamento/forma-pagamento-list/forma-pagamento-list.component';
import { ItemMovimentacaoListComponent } from './features/cadastros-basicos/item-movimentacao/item-movimentacao-list/item-movimentacao-list.component';
import { ItemMovimentacaoFormComponent } from './features/cadastros-basicos/item-movimentacao/item-movimentacao-form/item-movimentacao-form.component';
import { MovPrevistaListComponent } from './features/lancamentos/mov-prevista/mov-prevista-list/mov-prevista-list.component';
import { MovPrevistaFormCadastroComponent } from './features/lancamentos/mov-prevista/mov-prevista-create/mov-prevista-form-cadastro/mov-prevista-form-cadastro.component';
import { MovPrevistaFormControlesComponent } from './features/lancamentos/mov-prevista//mov-prevista-create/mov-prevista-form-controles/mov-prevista-form-controles.component';
import { MovPrevistaQuitarFormComponent } from './features/lancamentos/mov-prevista/mov-prevista-quitar-form/mov-prevista-quitar-form.component';
import { MovRealizadaListComponent } from './features/lancamentos/mov-realizada/mov-realizada-list/mov-realizada-list.component';
import { MovRealizadaFormCadastroComponent } from './features/lancamentos/mov-realizada/mov-realizada-form-cadastro/mov-realizada-form-cadastro.component';
import { FechamentoComponent} from './features/lancamentos/fechamento/fechamento.component';

import { CategoriaListResolver } from './features/cadastros-basicos/_guards/categoria-list-resolver';
import { ContaListResolver } from './features/cadastros-basicos/_guards/conta-list-resolver';
import { FormaPagamentoListResolver } from './features/cadastros-basicos/_guards/forma-pagamento-list-resolver';
import { ItemMovimentacaoListResolver } from './features/cadastros-basicos/_guards/item-movimentacao-list-resolver';
import { CategoriaFormResolver } from './features/cadastros-basicos/_guards/categoria-form-resolver';
import { ContaFormResolver } from './features/cadastros-basicos/_guards/conta-form-resolver';
import { FormaPagamentoFormResolver } from './features/cadastros-basicos/_guards/forma-pagamento-form-resolver';
import { ItemMovimentacaoFormResolver } from './features/cadastros-basicos/_guards/item-movimentacao-form-resolver';
import { MovPrevistaListResolver } from './features/lancamentos/_guards/mov-prevista-list-resolver';
import { MovPrevistaFormResolver } from './features/lancamentos/_guards/mov-prevista-form-resolver';
import { MovRealizadaListResolver } from './features/lancamentos/_guards/mov-realizada-list-resolver';
import { MovRealizadaFormResolver } from './features/lancamentos/_guards/mov-realizada-form-resolver';
import { MovPrevistaQuitarResolver } from './features/lancamentos/_guards/mov-prevista-quitar-resolver';
import { MovRealizadaGroupByContaResolver } from './features/lancamentos/_guards/mov-realizada-gb-conta-resolver';
import { FechamentoListResolver } from './features/lancamentos/_guards/fechamento-list-resolver';


//criando o mapeamento de rotas dos componentes

const routes: Routes = [

    { path: '', component: LoginFormComponent },
    { path: 'login', component: LoginFormComponent },   
    //================================================================================================= 
    { path: 'usuario/new', component: UsuarioFormCreateComponent,
             canDeactivate:[AuthGuard] },
    { path: 'usuario/edit/null', component: UsuarioFormUpdateComponent,
             canDeactivate:[AuthGuard]},
    { path: 'usuario/delete', component: UsuarioFormDeleteComponent },
    //=================================================================================================
    { path: 'categoria', component: CategoriaListComponent, 
             canActivate:[AuthGuard],             
             resolve: {resolveResources: CategoriaListResolver} },
    { path: 'categoria/new', component: CategoriaFormComponent, 
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard]},
    { path: 'categoria/edit/:id', component: CategoriaFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard],
             resolve: {resolveResource: CategoriaFormResolver}  },
    //=================================================================================================
    { path: 'conta', component: ContaListComponent,
             canActivate:[AuthGuard],
             resolve: {resolveResources: ContaListResolver} },
    { path: 'conta/new', component: ContaFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard] },
    { path: 'conta/edit/:id', component: ContaFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard],
             resolve: {resolveResource: ContaFormResolver} },
    //=================================================================================================
    { path: 'forma-pagamento', component: FormaPagamentoListComponent,
             canActivate:[AuthGuard],
             resolve:{resolveResources: FormaPagamentoListResolver} },
    { path: 'forma-pagamento/new', component: FormaPagamentoFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard] },
    { path: 'forma-pagamento/edit/:id', component: FormaPagamentoFormComponent,             
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard],
             resolve: {resolveResource: FormaPagamentoFormResolver} },
    //=================================================================================================
    { path: 'item-movimentacao', component: ItemMovimentacaoListComponent,
             canActivate:[AuthGuard],             
             resolve:{resolveResources: ItemMovimentacaoListResolver}  },
    { path: 'item-movimentacao/new', component: ItemMovimentacaoFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard] },
    { path: 'item-movimentacao/edit/:id', component: ItemMovimentacaoFormComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard],
             resolve: {resolveResource: ItemMovimentacaoFormResolver} },
    //=================================================================================================
    { path: 'mov-prevista/:dataIni/:dataFim', component: MovPrevistaListComponent,
             canActivate:[AuthGuard],             
             resolve:{resolveResources: MovPrevistaListResolver}  },               
    { path: 'mov-prevista/new/:dataVencIni/:dataVencFim', component: MovPrevistaFormCadastroComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard]  },
    { path: 'mov-prevista/controles', 
             component: MovPrevistaFormControlesComponent,
             canActivate:[AuthGuard]},
    { path: 'mov-prevista/edit/:idItemMov/:dataRef/:dataVencIni/:dataVencFim', component: MovPrevistaFormCadastroComponent,
             canActivate:[AuthGuard],             
             resolve:{resolveMovPrev: MovPrevistaFormResolver}  },
    { path: 'mov-prevista/quitar/:idItemMov/:dataRef/:dataVencIni/:dataVencFim', component: MovPrevistaQuitarFormComponent,
             canActivate:[AuthGuard], 
             //posso ter qts resolvers que eu quiser...            
             resolve:{resolveMovReal: MovPrevistaQuitarResolver, 
                      resolveMovPrev: MovPrevistaFormResolver,
                      resolveConta: ContaListResolver,
                      resolveFormPag: FormaPagamentoListResolver} },
             
    //=================================================================================================
    { path: 'mov-realizada/new/:dataRealIni/:dataRealFim', component: MovRealizadaFormCadastroComponent,
             canActivate:[AuthGuard],
             canDeactivate:[AuthGuard]  },
    //=======rotas com "resolve" devem ficar por último para execução da rota correta==================
    { path: 'mov-realizada/edit/:idMovReal/:dataRealIni/:dataRealFim', component: MovRealizadaFormCadastroComponent,
             canActivate:[AuthGuard],             
             resolve:{resolveMovReal: MovRealizadaFormResolver}  },
    { path: 'mov-realizada/:dataRealIni/:dataRealFim', component: MovRealizadaListComponent,
             canActivate:[AuthGuard],             
             resolve:{resolveMovReal: MovRealizadaListResolver}  },

    //================================================================================================
     { path: 'fechamento/:dataIni/:dataFim', component: FechamentoComponent,
     canActivate:[AuthGuard],
     resolve: {resolveFechamento: FechamentoListResolver,
               resolveMovPrev: MovPrevistaListResolver,
               resolveMovReal: MovRealizadaGroupByContaResolver}},

    //================================================================================================
    { path: 'receitas-despesas-dashboard', component: ReceitasDespesasDashboardComponent,
            /* canActivate:[AuthGuard] */},
    //=================================================================================================
    { path: '**', component: Error404Component}
];

//registrando o mapeamento no Angular
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[CategoriaListResolver,
               CategoriaFormResolver,
               ContaListResolver,
               ContaFormResolver,
               FormaPagamentoFormResolver,
               FormaPagamentoListResolver,
               ItemMovimentacaoListResolver,            
               ItemMovimentacaoFormResolver,
               MovPrevistaListResolver,
               MovPrevistaFormResolver,
               MovRealizadaListResolver,
               MovRealizadaFormResolver,
               MovPrevistaQuitarResolver,
               FechamentoListResolver,
               MovRealizadaGroupByContaResolver]
})

export class AppRoutingModule { }
