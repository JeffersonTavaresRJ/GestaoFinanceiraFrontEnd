//importando a biblioteca padrão do Angular
import { NgModule } from '@angular/core';

//importando as bibliotecas de rotas do angular
import { Routes, RouterModule } from '@angular/router';

//importando os componentes que iremos mapear
import { LoginFormComponent } from './features/security/login-form/login-form.component';
import { UsuarioFormCreateComponent } from './features/security/usuario-form-create/usuario-form-create.component';
import {UsuarioFormDeleteComponent} from './features/security/usuario-form-delete/usuario-form-delete.component';
import { ReceitasDespesasDashboardComponent } from './features/dashboards/receitas-despesas-dashboard/receitas-despesas-dashboard.component';
import { CategoriaListComponent } from './features/cadastros-basicos/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './features/cadastros-basicos/categoria-form/categoria-form.component';
import { UsuarioFormUpdateComponent } from './features/security/usuario-update/usuario-form-update/usuario-form-update.component';


//criando o mapeamento de rotas dos componentes
const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'usuario/new', component: UsuarioFormCreateComponent },
    { path: 'usuario/edit', component: UsuarioFormUpdateComponent},
    { path: 'usuario/delete', component: UsuarioFormDeleteComponent },
    { path: 'categoria', component: CategoriaListComponent },
    { path: 'categoria/new', component: CategoriaFormComponent },
    { path: 'categoria/:id/edit', component: CategoriaFormComponent },
    { path: 'receitas-despesas-dashboard', component: ReceitasDespesasDashboardComponent }
];

//registrando o mapeamento no Angular
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
