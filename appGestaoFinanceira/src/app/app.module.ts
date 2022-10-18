import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

//importação de componentes..
import { BSHttpLoading } from './core/services/bs-http-loading';
import { HttpRequestInterceptor } from './core/services/http-request-interceptor';

//importação dos modulos do sistema..
import { CoreModule } from './core/core.module';
import { CadastrosBasicosModule } from '../app/features/cadastros-basicos/cadastros-basicos.module';
import { SecurityModule } from './features/security/security.module';
import { DashboardsModule } from './features/dashboards/dashboards.module';
import { LancamentosModule } from './features/lancamentos/lancamentos.module';
//

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const RxJS_Services = [HttpRequestInterceptor, BSHttpLoading];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgxSpinnerModule,
    CoreModule,
    CadastrosBasicosModule,
    SecurityModule,
    LancamentosModule,
    DashboardsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    RxJS_Services,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' },/*Configuração da vírgula e ponto para a moeda Brasil*/
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }/*Deixar default o pipe currency para moeda Brasil*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
