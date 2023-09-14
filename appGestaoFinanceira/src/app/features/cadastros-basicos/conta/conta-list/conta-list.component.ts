import { Component, Injector } from '@angular/core';
import { GenericResourceListComponent } from 'src/app/shared/components/generic-resource-list/generic-resource-list.component';
import { Conta } from '../../_models/conta-model';
import { ContaService } from '../../_services/conta-service';
import { Reports } from 'src/app/shared/functions/reports';

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent extends GenericResourceListComponent<Conta> {
  paginaAtual:number=1;
  constructor(protected injector: Injector,
              private contaService: ContaService) {
    super(injector, contaService);
   } 

   public gerarExcel(){
    this.contaService.getReport().subscribe(
      success=>{
        Reports.download(success, "EXCEL", "Contas");
      }
    );    
   }

}