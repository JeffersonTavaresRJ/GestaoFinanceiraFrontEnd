import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CoreModule } from 'src/app/core/core.module';
import { MovPrevistaListComponent } from './mov-prevista/mov-prevista-list/mov-prevista-list.component';
import { MovPrevistaFormComponent } from './mov-prevista/mov-prevista-form/mov-prevista-form.component';
import { MovPrevistaQuitarFormComponent } from './mov-prevista/mov-prevista-quitar-form/mov-prevista-quitar-form.component';



@NgModule({
  declarations: [
    MovPrevistaListComponent,
    MovPrevistaFormComponent,
    MovPrevistaQuitarFormComponent
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
    InputTextareaModule
  ]
})
export class LancamentosModule { }
