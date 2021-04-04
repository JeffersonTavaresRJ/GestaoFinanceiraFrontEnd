
import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResourceModel } from '../../models/generic-resource-model';
import { GenericResourceService } from '../../services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit {

    resourceMessageButton: string;
    resourceForm: FormGroup;

    protected resourceFormBuilder: FormBuilder;

    private validationErrors: any[] = [];    
    private router: Router;
    private route: ActivatedRoute;


    constructor(protected injector: Injector,        
        protected resourceService: GenericResourceService<T>,
        protected resourceAlertMessage: AlertMessageForm,
        protected redirectRouterLink: string) {

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.resourceFormBuilder = injector.get(FormBuilder);
    }

    ngOnInit(): void {
        this.buildResourceForm();
    }

    resourceValidations(param: string): any[] {
        
        if (this.resourceForm.valid && this.validationErrors.length > 0){
           // debugger;
            return this.validationErrors.filter(i => i.propertyName == param);
        }
        
    }

    resourceSubmmit() {
        if (this.resourceCurrentAction() == 'new') {
            this.resourceCreate(this.resourceForm.value)
        } else if (this.resourceCurrentAction() == 'edit'){
            this.resourceUpdate(this.resourceForm.value)
        }else if (this.resourceCurrentAction() == 'delete'){
            this.resourceDelete(this.resourceForm.value.id)
        }else{
            this.resourceAlertMessage.showError('Rota não encontrada', 'Sr. Usuário');
        }
    }

    resourceClearValidations() {
        this.validationErrors = [];
    }

    protected abstract buildResourceForm();

    protected resourceCreate(formResource: any): void {
        this.resourceMessageButton = 'Processando...';
        this.resourceService.post(formResource)
            .subscribe(
                sucess => this.resourceActionForSucess(sucess),
                error => this.resourceActionForError(error)
            );
    }

    protected resourceUpdate(formResource: any): void {
        this.resourceMessageButton = 'Atualizando...';
        this.resourceService.put(formResource)
            .subscribe(
                sucess => this.resourceActionForSucess(sucess),
                error => this.resourceActionForError(error)
            );
    }

    protected resourceDelete(id: number): void {
        this.resourceMessageButton = 'Excluindo...';
        this.resourceService.delete(id)
            .subscribe(
                sucess => this.resourceActionForSucess(sucess),
                error => this.resourceActionForError(error)
            );
    }

    protected resourceCurrentAction(): string {
        if (this.route.snapshot.url[1].path == 'new') {
            return 'new'
        } else if (this.route.snapshot.url[1].path == 'edit'){
            return 'edit'
        } else{
            return 'delete'
        }
    }

    protected resourceActionForSucess(s): void {

        if (this.redirectRouterLink != null) {
            this.router.navigate([this.redirectRouterLink]);

        } else {
            this.resourceMessageButton = null;
        }
        this.resourceAlertMessage.showSuccess(s.message, 'Sr. Usuário');
    }

    protected resourceActionForError(e): void {
        this.resourceMessageButton = null;

        if (e.status == 0) {
            this.resourceAlertMessage.showError('Erro de conexão com o servidor', 'Sr. Usuário');
            console.log(this.validationErrors);
        } 
        if (e.status == 400) {
            this.validationErrors = e.error; //validação de formulários (BadRequest)
            console.log(this.validationErrors);
        } 
        else if (e.status == 403) {
            this.resourceAlertMessage.showInfo('A Sessão foi expirada', 'Operação Cancelada');//token expirado
            window.location.href = '/login';
        } else {
            this.resourceAlertMessage.showError(e.error, 'Sr. Usuário');
            console.log(e.error);
        }
    }
}