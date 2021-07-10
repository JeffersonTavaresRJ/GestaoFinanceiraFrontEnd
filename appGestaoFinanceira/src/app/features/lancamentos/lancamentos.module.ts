import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentsBusinessModule } from '../components/components-business-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReceitaDespesaPrevistaConsultaFormComponent } from './receita-despesa-prevista/receita-despesa-prevista-consulta/receita-despesa-prevista-consulta-form/receita-despesa-prevista-consulta-form.component';
import { ReceitaDespesaPrevistaConsultaListComponent } from './receita-despesa-prevista/receita-despesa-prevista-consulta/receita-despesa-prevista-consulta-list/receita-despesa-prevista-consulta-list.component';
import { ReceitaDespesaPrevistaConsultaParametrosComponent } from './receita-despesa-prevista/receita-despesa-prevista-consulta/receita-despesa-prevista-consulta-parametros/receita-despesa-prevista-consulta-parametros.component';

@NgModule({
  declarations: [ReceitaDespesaPrevistaConsultaFormComponent,
                 ReceitaDespesaPrevistaConsultaListComponent, 
                 ReceitaDespesaPrevistaConsultaParametrosComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ComponentsBusinessModule,
    CalendarModule ]
})
export class LancamentosModule { }
