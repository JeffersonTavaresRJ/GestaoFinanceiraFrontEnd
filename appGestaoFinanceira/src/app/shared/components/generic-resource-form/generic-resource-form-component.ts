
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericResourceModel } from '../../models/generic-resource-model';
import { GenericResourceService } from '../../services/generic-resource-service';
import {AlertMessage} from '../alert-form/model/alert-message-model';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit {

    resourceMessageButton: string;    
    resourceAlertMessage: AlertMessage;
    resourceForm: FormGroup;

    private validationErrors: any[]=[];
    private redirectRouterLink: string;
    private router: Router;
    private route: ActivatedRoute;


    constructor(protected injector: Injector,
        protected resourceService: GenericResourceService<T>) {

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
    }


    ngOnInit(): void {
    }

    resourceValidations(param:string): any[] {
        return this.validationErrors.filter(i=>i.propertyName==param);
    }


    resourceSave(formResource) {
        if (this.resourceCurrentAction() == 'new') {
            this.resourceCreate(formResource)
        } else {
            this.resourceUpdate(formResource)
        }
    }

    resourceClearValidations(){
        this.validationErrors=[];
    }

    protected resourceCreate(formResource: any): void {
        this.resourceMessageButton = 'Processando...';
        this.resourceService.post(formResource.value)
            .subscribe(
                sucess => this.resourceActionForSucess(sucess),
                error => this.resourceActionForError(error)
            );
    }

    protected resourceUpdate(formResource: any): void {
        this.resourceMessageButton = 'Processando...';
        this.resourceService.put(formResource.value)
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
            this.resourceMessageButton = '';
        }
        this.resourceAlertMessage = new AlertMessage('sucess', s.message);
    }

    protected resourceActionForError(e): void {
        this.resourceMessageButton = '';

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

    resourceCloseMessage() {
        this.resourceAlertMessage = null;
    }
}