import { Directive, Injector, OnInit } from '@angular/core';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';

@Directive()
export abstract class GenericResourceListComponent<T extends GenericResourceModel>
  implements OnInit {

  resources: T[] = [];
  resourceDeleteMessage: string;
  protected resourceAlertMessage: AlertMessageForm;
  private resourceDeleteId: number;
  private usuario: Usuario;

  constructor(protected injector: Injector,
    private resourceService: GenericResourceService<T>) {
    this.resourceAlertMessage = injector.get(AlertMessageForm);
  }

  ngOnInit(): void {
    this.resourceList();
  }

  resourceList(){
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.resourceService.getByUser(this.usuario.id).subscribe(
      sucess => this.resources = sucess,
      error =>  this.resourceAlertMessage.showError(error, 'Sr. Usuário')
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
    this.resourceService.delete(id).subscribe(
      sucess => {
        this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
        this.ngOnInit();
      },
      error => this.resourceAlertMessage.showError(error, 'Sr. Usuário')
    )
  }

  ngOnDestroy() {
    this.setResourceApiOption('');
  }
}