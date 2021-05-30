import { Directive, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarUsuarioObservable } from 'src/app/core/services/autenticar-usuario-observable';
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
  resourceTableLoading: boolean;
  resourceMessageTableNotFound: string;
  protected resourceAlertMessage: AlertMessageForm;  
  private autenticarUsuarioObservable : AutenticarUsuarioObservable;
  private resourceDeleteId: number;
  private usuario: Usuario;
  private router: Router;

  constructor(protected injector: Injector,
    private resourceService: GenericResourceService<T>) {
    this.router = injector.get(Router);
    this.resourceAlertMessage = injector.get(AlertMessageForm);
    this.autenticarUsuarioObservable = injector.get(AutenticarUsuarioObservable);
    this.resourceMessageTableNotFound = 'Dados não encontrados para a consulta especificada';
  }

  ngOnInit(): void {
    this.resourceList();
  }

  resourceList(){
    this.resourceTableLoading=true;
    this.usuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    this.resourceService.getByUser(this.usuario.id).subscribe(
      sucess => {
        this.resources = sucess; 
        this.resourceTableLoading = false;        
      },
      error =>  {
        this.resourceTableLoading = false;
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