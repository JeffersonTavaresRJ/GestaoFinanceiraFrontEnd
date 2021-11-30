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
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoreModule } from 'src/app/core/core.module';
import { MovPrevistaListComponent } from './mov-prevista/mov-prevista-list/mov-prevista-list.component';
import { MovPrevistaFormCadastroComponent } from './mov-prevista/mov-prevista-create/mov-prevista-form-cadastro/mov-prevista-form-cadastro.component';
import { MovPrevistaQuitarFormComponent } from './mov-prevista/mov-prevista-quitar-form/mov-prevista-quitar-form.component';
import { MovPrevistaFormControlesComponent } from './mov-prevista/mov-prevista-create/mov-prevista-form-controles/mov-prevista-form-controles.component';



@NgModule({
  declarations: [
    MovPrevistaListComponent,
    MovPrevistaFormCadastroComponent,
    MovPrevistaQuitarFormComponent,
    MovPrevistaFormControlesComponent
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
    DialogModule,
    ConfirmDialogModule
  ]
})
export class LancamentosModule { }
