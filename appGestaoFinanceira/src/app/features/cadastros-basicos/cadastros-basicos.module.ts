import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsBusinessModule } from '../components/components-business-module';
import{ NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CategoriaFormComponent, CategoriaListComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ComponentsBusinessModule,
    NgxPaginationModule
  ]
})
export class CadastrosBasicosModule { }
