
import { OnInit, Injector, Directive, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AutenticarUsuarioObservable } from 'src/app/core/services/AutenticarUsuarioObservable';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit, OnDestroy {

    resourceMessageButton: string;
    resourceForm: FormGroup;
    resourcePageTitle: string;
    resourceUsuario: Usuario;
    resourceClass_: T;

    protected autenticarUsuarioObservable: AutenticarUsuarioObservable;
    protected resourceAlertMessage: AlertMessageForm;
    protected resourceFormBuilder: FormBuilder;

    private validationErrors: any[] = [];
    private router: Router;
    private route: ActivatedRoute;

    constructor(protected injector: Injector,
        protected resourceClass: T,
        protected resourceService: GenericResourceService<T>,
        protected redirectRouterLink: string) {

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.resourceFormBuilder = injector.get(FormBuilder);
        this.autenticarUsuarioObservable = injector.get(AutenticarUsuarioObservable);
        this.resourceAlertMessage = injector.get(AlertMessageForm);
        this.resourceClass_ = this.resourceClass;

        this.resourceUsuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    }

    ngOnInit(): void {
        debugger;
        this.loadResource();
        this.buildResourceForm();
    }

    ngOnDestroy(): void {
        this.setResourceApiOption('');
    }

    setResourceApiOption(apiOption: string) {
        this.resourceService.setApiOption(apiOption);
    }

    resourceSubmmit() {
        if (this.resourceCurrentAction() == 'new') {
            this.resourceCreate(this.resourceForm.value)
        } else if (this.resourceCurrentAction() == 'edit') {
            this.resourceUpdate(this.resourceForm.value)
        } else if (this.resourceCurrentAction() == 'delete') {
            this.resourceDelete(this.resourceForm.value.id)
        } else {
            this.resourceAlertMessage.showError('Rota não encontrada', 'Sr. Usuário');
        }
    }

    resourceClearValidations() {
        this.validationErrors = [];
    }

    resourceErrorsValidations(param: string): any[] {
        if (this.resourceForm.valid && this.validationErrors.length > 0) {
            // debugger;
            return this.validationErrors.filter(i => i.propertyName.toLowerCase() == param);
        }
    }

    resourceCurrentAction(): string {
        if (this.route.snapshot.url[1].path == 'new') {
            this.resourcePageTitle = this.resourceCreatePageTitle();
            return 'new'
        } else if (this.route.snapshot.url[1].path == 'edit') {
            this.resourcePageTitle = this.resourceEditPageTitle();
            return 'edit'
        } else {
            this.resourcePageTitle = this.resourceDeletePageTitle();
            return 'delete'
        }
    }

    protected abstract buildResourceForm();

    protected resourceCreate(formResource: any) {
        this.resourceMessageButton = 'Processando...';
        this.resourceService.post(formResource)
            .subscribe(
                sucess => {
                    this.resourceActionForSucess();
                    this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
                },
                error => { this.resourceActionForError(error) }
            );
    }

    protected resourceUpdate(formResource: any) {
        this.resourceMessageButton = 'Atualizando...';
        this.resourceService.put(formResource)
            .subscribe(
                sucess => {
                    this.resourceActionForSucess();
                    this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
                },
                error => { this.resourceActionForError(error) }
            );
    }

    protected resourceDelete(id: number) {
        this.resourceMessageButton = 'Excluindo...';
        this.resourceService.delete(id)
            .subscribe(
                sucess => {
                    this.resourceActionForSucess();
                    this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
                },
                error => { this.resourceActionForError(error) }
            );
    }

    protected resourceActionForSucess(): void {

        if (this.redirectRouterLink != null) {

            if (this.redirectRouterLink == '/login') {
                this.autenticarUsuarioObservable.set(false);
            }
            this.router.navigate([this.redirectRouterLink]);

        } else {
            this.resourceMessageButton = null;
        }

    }

    protected resourceActionForError(e): void {
        this.resourceMessageButton = null;
        debugger;
        if (e.status == 0) {
            //servidor fora
            this.resourceAlertMessage.showError('Erro de conexão com o servidor', 'Sr. Usuário');
        }
        if (e.status == 400) {
            //validação de formulários (BadRequest) 
            this.validationErrors = e.error;
        }
        else if (e.status == 401 || e.status == 403) {
            //token expirado
            this.resourceAlertMessage.showInfo('Sessão expirada', 'Operação Cancelada');
            this.autenticarUsuarioObservable.set(false);
            this.router.navigate(['/login']);
        }
        else if (e.status == 418) {
            //exceções customizadas
            this.resourceAlertMessage.showInfo(e.error, 'Sr. Usuário');
        } else if (e.status == 500) {
            //error status code 500..
            this.resourceAlertMessage.showError(e.error, 'Sr. Usuário');
        } else {
            this.resourceAlertMessage.showError(e.error, 'Sr. Usuário');
            console.log(e.error.error);
        }
    }

    protected resourceCreatePageTitle():string{
        return 'Novo';
    }

    protected resourceEditPageTitle():string{
        return 'Edição';
    }

    protected resourceDeletePageTitle():string{
        return 'Exclusão';
    }

    private loadResource() {
        if (this.resourceCurrentAction() == 'edit' &&
            this.route.snapshot.url[2].path != 'null'){
                this.setResourceApiOption('/GetId');
                this.route.paramMap.pipe(
                    switchMap(params => this.resourceService.getById(+params.get("id")))
            )
                .subscribe(
                    (resource) => {
                        this.resourceForm.patchValue(resource) // binds loaded resource data to resourceForm
                    },
                    (error) => this.resourceAlertMessage.showError(error.error, 'Sr. Usuário')
                )

            }            
    }
}