import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import{ NgxPaginationModule } from 'ngx-pagination';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {MatStepperModule} from '@angular/material/stepper';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../-components/-components.module';
import { MovPrevistaListComponent } from './mov-prevista/mov-prevista-list/mov-prevista-list.component';
import { MovPrevistaFormCadastroComponent } from './mov-prevista/mov-prevista-create/mov-prevista-form-cadastro/mov-prevista-form-cadastro.component';
import { MovPrevistaQuitarFormComponent } from './mov-prevista/mov-prevista-quitar-form/mov-prevista-quitar-form.component';
import { MovPrevistaFormControlesComponent } from './mov-prevista/mov-prevista-create/mov-prevista-form-controles/mov-prevista-form-controles.component';
import { MovRealizadaFormCadastroComponent } from './mov-realizada/mov-realizada-form-cadastro/mov-realizada-form-cadastro.component';
import { MovRealizadaListComponent } from './mov-realizada/mov-realizada-list/mov-realizada-list.component';
import { FechamentoComponent } from './fechamento/fechamento.component';


@NgModule({
  declarations: [
    MovPrevistaListComponent,
    MovPrevistaFormCadastroComponent,
    MovPrevistaQuitarFormComponent,
    MovPrevistaFormControlesComponent,
    MovRealizadaFormCadastroComponent,
    MovRealizadaListComponent,
    FechamentoComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ScrollingModule,
    InputTextModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    InputTextareaModule,
    InputMaskModule,
    NgxPaginationModule,
    MatStepperModule,
    DialogModule,
    ConfirmDialogModule,
    ComponentsModule
  ]
})
export class LancamentosModule { }