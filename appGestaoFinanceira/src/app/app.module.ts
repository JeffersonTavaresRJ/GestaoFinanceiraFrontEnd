import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
/*====importação de módulos====*/
import { CoreModule } from '../app/core/core.module';
import { CadastrosBasicosModule } from '../app/features/cadastros-basicos/cadastros-basicos.module';
import { SecurityModule } from '../app/features/security/security.module';
import { DashboardsModule } from '../app/features/dashboards/dashboards.module';

/*============================*/

/*====importação de componentes====*/
import { AppComponent } from './app.component';
import { HttpLoadingObservable } from '../app/core/services/http-loading-observable'
import { HttpRequestInterceptor } from 'src/app/http-request-interceptor';
//import { TipoItemMovimentacaoComponent } from './features/components/dropdowns/tipo-item-movimentacao/tipo-item-movimentacao.component';

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
    SecurityModule,
    DashboardsModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  /*schemas: [CUSTOM_ELEMENTS_SCHEMA],*/
  providers: [
    HttpLoadingObservable,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],  
  bootstrap: [AppComponent] // >> o componente que será inicializado na aplicação  
})
export class AppModule { }