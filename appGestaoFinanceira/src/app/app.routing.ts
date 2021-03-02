//importando a biblioteca padrão do Angular
import { NgModule } from '@angular/core';

//importando as bibliotecas de rotas do angular
import { Routes, RouterModule } from '@angular/router';

//importando os componentes que iremos mapear
import { LoginFormComponent } from './features/security/login-form/login-form.component';
import { UsuarioFormComponent } from './features/security/usuario-form/usuario-form.component';
import { ReceitasDespesasDashboardComponent } from './features/dashboards/receitas-despesas-dashboard/receitas-despesas-dashboard.component';


//criando o mapeamento de rotas dos componentes
const routes: Routes = [
    { path : 'login', component : LoginFormComponent },
    { path : 'register', component : UsuarioFormComponent },
    { path : 'receitas-despesas-dashboard', component : ReceitasDespesasDashboardComponent }
];

//registrando o mapeamento no Angular
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}
