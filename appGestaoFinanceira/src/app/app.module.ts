import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*====importação de módulos====*/
import {CoreModule} from '../app/core/core.module';
import {CadastrosBasicosModule} from '../app/features/cadastros-basicos/cadastros-basicos.module';
import {SecurityModule} from '../app/features/security/security.module';
/*============================*/

/*====importação de componentes====*/
import { AppComponent } from './app.component';
/*============================*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CadastrosBasicosModule,
    SecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent] // >> o componente que será inicializado na aplicação  
})
export class AppModule { }
