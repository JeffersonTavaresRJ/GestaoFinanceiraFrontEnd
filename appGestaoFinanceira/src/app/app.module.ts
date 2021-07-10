import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

/*====importação de módulos====*/
import { CoreModule } from '../app/core/core.module';
import { CadastrosBasicosModule } from '../app/features/cadastros-basicos/cadastros-basicos.module';
import { SecurityModule } from '../app/features/security/security.module';
import { DashboardsModule } from '../app/features/dashboards/dashboards.module';
import { LancamentosModule } from './features/lancamentos/lancamentos.module';
/*============================*/

/*====importação de componentes====*/
import { AppComponent } from './app.component';
import { BSHttpLoading } from './core/services/bs-http-loading'
import { HttpRequestInterceptor } from 'src/app/core/services/http-request-interceptor';
import { AuthGuard } from './core/security/auth-guard';

const RxJS_Services = [HttpRequestInterceptor, BSHttpLoading];
/*============================*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    CadastrosBasicosModule,
    LancamentosModule,
    SecurityModule,
    DashboardsModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthGuard,
    RxJS_Services,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],  
  bootstrap: [AppComponent] // >> o componente que será inicializado na aplicação  
})
export class AppModule { }