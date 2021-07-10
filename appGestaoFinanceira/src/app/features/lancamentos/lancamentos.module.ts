import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentsBusinessModule } from '../components/components-business-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovPrevistaConsultaParamComponent } from './mov-prevista/mov-prevista-consulta/mov-prevista-consulta-param/mov-prevista-consulta-param.component';
import { MovPrevistaConsultaListComponent } from './mov-prevista/mov-prevista-consulta/mov-prevista-consulta-list/mov-prevista-consulta-list.component';
import { MovPrevistaFormComponent } from './mov-prevista/mov-prevista-form/mov-prevista-form.component';

@NgModule({
  declarations: [MovPrevistaConsultaParamComponent, MovPrevistaConsultaListComponent, MovPrevistaFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    ComponentsBusinessModule,
    CalendarModule ]
})
export class LancamentosModule { }
