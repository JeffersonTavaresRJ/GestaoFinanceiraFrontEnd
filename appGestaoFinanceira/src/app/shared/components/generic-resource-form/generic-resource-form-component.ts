
import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResourceModel } from '../../models/generic-resource-model';
import { GenericResourceService } from '../../services/generic-resource-service';
import { AlertMessage } from '../alert-form/model/alert-message-model';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit {

    resourceMessageButton: string;
    resourceAlertMessage: AlertMessage;
    resourceForm: FormGroup;

    protected resourceFormBuilder: FormBuilder;

    private validationErrors: any[] = [];
    private redirectRouterLink: string;
    private router: Router;
    private route: ActivatedRoute;


    constructor(protected injector: Injector,
        protected resourceService: GenericResourceService<T>) {

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.resourceFormBuilder = injector.get(FormBuilder);
    }


    ngOnInit(): void {
        this.buildResourceForm();
    }

    resourceValidations(param: string): any[] {
        return this.validationErrors.filter(i => i.propertyName == param);
    }

    resourceSave() {
        if (this.resourceCurrentAction() == 'new') {
            this.resourceCreate(this.resourceForm.value)
        } else {
            this.resourceUpdate(this.resourceForm.value)
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
        this.resourceMessageButton = 'Processando...';
        this.resourceService.put(formResource)
            .subscribe(
                sucess => this.resourceActionForSucess(sucess),
                error => this.resourceActionForError(error)
            );
    }

    protected resourceCurrentAction(): string {
        if (this.route.snapshot.url[1].path == 'new') {
            return 'new'
        } else {
            return 'edit'
        }
    }

    protected resourceActionForSucess(s): void {

        if (this.redirectRouterLink != null) {
            this.router.navigate([this.redirectRouterLink]);

        } else {
            this.resourceMessageButton = null;
        }
        this.resourceAlertMessage = new AlertMessage('success', s.message);
    }

    protected resourceActionForError(e): void {
        this.resourceMessageButton = null;

        if (e.status === 400) {
            this.validationErrors = e.error; //validação de formulários 
            console.log(this.validationErrors);

        } else if (e.status === 403) {
            this.resourceAlertMessage = new AlertMessage('error', e.error); //mensagem de crítica          
        } else {
            this.resourceAlertMessage = new AlertMessage('error', 'Erro no processamento do servidor');
            console.log(e.error);
        }

    }
}