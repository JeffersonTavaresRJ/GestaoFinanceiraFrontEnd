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
  usuario: Usuario;
  protected resourceAlertMessage: AlertMessageForm;

  constructor(protected injector: Injector,
    private genericResourceService: GenericResourceService<T>) {
    this.resourceAlertMessage = injector.get(AlertMessageForm);
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));      
    this.genericResourceService.getAll(this.usuario.id).subscribe(
      sucess => this.resources = sucess,
      error => this.resourceAlertMessage.showError(error.error, 'Sr. Usuário')
    );
  }

  abstract resultEventExclusao(event);

  deleteReource(id: number) {
    this.genericResourceService.delete(id).subscribe(
      sucess => this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário'),
      error => this.resourceAlertMessage.showError(error.error, 'Sr. Usuário')
    )
  }

}
