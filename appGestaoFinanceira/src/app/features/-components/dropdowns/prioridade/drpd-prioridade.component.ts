import { Component} from '@angular/core';
import { GenericResourceDropDownEnumComponent } from 'src/app/shared/components/generic-resource-dropdown/generic-resource-dropdown-enum.component';
import { MovPrevistaService } from 'src/app/features/lancamentos/_services/mov-prevista-service';
import { MovimentacaoPrevista } from 'src/app/features/lancamentos/_models/mov-prevista-model';


@Component({
  selector: 'app-dropdown-prioridade',
  templateUrl: './drpd-prioridade.component.html',
  styleUrls: ['./drpd-prioridade.component.css']
})
export class DropDownPrioridadeComponent extends GenericResourceDropDownEnumComponent{
  constructor(protected movPrevistaService: MovPrevistaService) {
    super();    
  }

  onPopulate(){
    debugger;
    this.movPrevistaService.GetAllEnuns("GetAllPrioridades").subscribe(
      success=>{ 
        this.arEnum = success
      }
    )
  }
}