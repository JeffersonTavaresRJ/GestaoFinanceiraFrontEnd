import { Directive, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';
import { Reports } from 'src/app/shared/functions/reports';

@Directive()
export abstract class GenericResourceListComponent<T extends GenericResourceModel>
  implements OnInit {

  resources: any[] = [];
  resourceDeleteMessage: string;
  resourceMessageTableNotFound: string;
  protected resourceAlertMessage: AlertMessageForm;  
  private resourceDeleteId: number;
  private actResourceRoute: ActivatedRoute;

  constructor(protected injector: Injector,
    private resourceService: GenericResourceService<T>) {
      this.resourceAlertMessage = injector.get(AlertMessageForm);
      this.actResourceRoute = injector.get(ActivatedRoute);
      this.resourceMessageTableNotFound = 'Dados não encontrados para a consulta especificada';
  }

  ngOnInit(): void {
    this.resourceList();
  }

  resourceList(){
    this.actResourceRoute.data.subscribe(
      (sucess:{resolveResources:T[]})=>{
        //o resolveResources deve ser o mesmo nome na variável resolve da rota.. 
        this.resources=sucess.resolveResources
        this.filtroOnInit();
      }
    );    
  }


 resourceEventDelete(event) {
    if (event) {
      this.deleteResource(this.resourceDeleteId);
    }
  };

  resourceModalDeleteMessage(id: number, descricao: string) {
    this.resourceDeleteId = id;
    this.resourceDeleteMessage = `${'Confirma a exclusão do item '}${descricao.bold()}${'?'}`;;
  }

  setResourceApiOption(apiOption: string) {
    this.resourceService.setApiOption(apiOption);
}

  protected deleteResource(id: number) {
    this.resourceService.deleteById(id).subscribe(
      sucess => {
        this.resourceAlertMessage.showSuccess(sucess.message);
        this.resourceService.getAll().subscribe(
          sucess=> this.resources  = sucess);
      },
      error => this.resourceAlertMessage.showError(error)
    )
  }

  public gerarExcel(){
    this.resourceService.GetAllReportExcel().subscribe(
      success=>{
        Reports.download(success, "EXCEL", "Lista");
      }
    );    
   }

  ngOnDestroy() {
    this.setResourceApiOption('');
  }

  filtroOnInit(){};
}