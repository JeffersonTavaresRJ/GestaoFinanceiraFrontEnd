
import { OnInit, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticarUsuarioObservable } from 'src/app/core/services/AutenticarUsuarioObservable';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit {

    resourceMessageButton: string;
    resourceForm: FormGroup;
    
    protected autenticarUsuarioObservable: AutenticarUsuarioObservable;
    protected resourceAlertMessage: AlertMessageForm;
    protected resourceFormBuilder: FormBuilder;

    private validationErrors: any[] = [];
    private router: Router;
    private route: ActivatedRoute;

    constructor(protected injector: Injector,
        protected resourceService: GenericResourceService<T>,
        protected redirectRouterLink: string) {
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.resourceFormBuilder = injector.get(FormBuilder);
        this.autenticarUsuarioObservable = injector.get(AutenticarUsuarioObservable);
        this.resourceAlertMessage = injector.get(AlertMessageForm);
    }

    ngOnInit(): void {
        this.buildResourceForm();
    }

    setResourceSubmmitApiName(apiName: string) {
        this.resourceService.setApiName(apiName);
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

    protected resourceCurrentAction(): string {
        if (this.route.snapshot.url[1].path == 'new') {
            return 'new'
        } else if (this.route.snapshot.url[1].path == 'edit') {
            return 'edit'
        } else {
            return 'delete'
        }
    }

    protected resourceActionForSucess(): void {

        if (this.redirectRouterLink != null) {  
            
            if (this.redirectRouterLink=='/login'){
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
        else if (e.status == 403) {
            //token expirado
            this.resourceAlertMessage.showInfo('Sessão expirada', 'Operação Cancelada');
            this.autenticarUsuarioObservable.set(false);
            this.router.navigate(['/login']);
        }
        else if (e.status == 418) {
            //exceções customizadas
            this.resourceAlertMessage.showInfo(e.error, 'Sr. Usuário');
        } else {            
            this.resourceAlertMessage.showError(e.error.error, 'Sr. Usuário');
            console.log(e.error.error);
        }
    }
}