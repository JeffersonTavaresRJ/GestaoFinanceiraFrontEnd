
import { OnInit, Injector, Directive, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BSAutenticarUsuario } from 'src/app/core/services/bs-autenticar-usuario';
import { Usuario } from 'src/app/features/security/_models/usuario-model';
import { environment } from 'src/environments/environment';
import { GenericResourceModel } from '../../_models/generic-resource-model';
import { GenericResourceService } from '../../_services/generic-resource-service';
import { AlertMessageForm } from '../alert-form/alert-message-form';



@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit, OnDestroy {

    resourceMessageButton!: string;
    resourceForm!: FormGroup;
    resourcePageTitle!: string;
    resourceUsuario!: Usuario;

    protected bsAutenticarUsuario: BSAutenticarUsuario;
    protected resourceAlertMessage: AlertMessageForm;
    protected resourceFormBuilder: FormBuilder;

    private validationErrors: any[] = [];
    protected router: Router;
    protected actResourceRoute: ActivatedRoute;

    constructor(protected injector: Injector,
        protected resourceClass: T,
        protected resourceService: GenericResourceService<T>,
        protected resourceJsonDataToResourceFn: (jsonData)=>T,
        protected redirectRouterLink: string) {

        this.router = injector.get(Router);
        this.resourceFormBuilder = injector.get(FormBuilder);
        this.bsAutenticarUsuario = injector.get(BSAutenticarUsuario);
        this.resourceAlertMessage = injector.get(AlertMessageForm);
        this.actResourceRoute = injector.get(ActivatedRoute);

        this.resourceUsuario = JSON.parse(window.localStorage.getItem(environment.keyUser));
    }

    ngOnInit(): void {
        this.buildResourceForm();  
        this.loadResource();   
    }

    ngOnDestroy(): void {
        this.setResourceApiOption('');
    }

    setResourceApiOption(apiOption: string) {
        this.resourceService.setApiOption(apiOption);
    }

    resourceSubmmit() {
        debugger;
        this.resourceClass = this.resourceJsonDataToResourceFn(this.resourceForm.value);
        if (this.resourceCurrentAction() == 'new') {
            this.resourceCreate(this.resourceClass)
        } else if (this.resourceCurrentAction() == 'edit') {
            this.resourceUpdate(this.resourceClass)
        } else if (this.resourceCurrentAction() == 'delete') {
            this.resourceDelete(this.resourceClass.id)
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
            return this.validationErrors.filter(i => i.propertyName.toLowerCase() == param.toLowerCase());
        }
    }

    resourceCurrentAction(): string {
        if (this.actResourceRoute.snapshot.url[1].path == 'new') {
            this.resourcePageTitle = this.resourceCreatePageTitle();
            return 'new'
        } else if (this.actResourceRoute.snapshot.url[1].path == 'edit') {
            this.resourcePageTitle = this.resourceEditPageTitle();
            return 'edit'
        } else {
            this.resourcePageTitle = this.resourceDeletePageTitle();
            return 'delete'
        }
    }

    parseToNumber(propertyName:string){
        this.resourceForm.get(propertyName).setValue(Number(this.resourceForm.get(propertyName).value));
    }

    protected abstract buildResourceForm();

    protected resourceCreate(resourceClass: T) {
       //debugger;
       //this.resourceMessageButton = 'Processando...';
        this.resourceService.post(resourceClass)
            .subscribe(
                sucess => {
                    this.resourceActionForSucess();
                    this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
                },
                error => { this.resourceActionForError(error) }
            );
    }

    protected resourceUpdate(resourceClass: T) {
        //this.resourceMessageButton = 'Atualizando...';
        this.resourceService.put(resourceClass)
            .subscribe(
                sucess => {
                    this.resourceActionForSucess();
                    this.resourceAlertMessage.showSuccess(sucess.message, 'Sr. Usuário');
                },
                error => { this.resourceActionForError(error) }
            );
    }

    protected resourceDelete(id: number) {
        //this.resourceMessageButton = 'Excluindo...';
        this.resourceService.deleteById(id)
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
                this.bsAutenticarUsuario.set(false);
            }
            this.router.navigate([this.redirectRouterLink]);

        } else {
            this.resourceMessageButton = null;
        }

    }

    protected resourceActionForError(e){
        this.resourceMessageButton = null;
        if (e.status == 400) {
            //validações da API (BadRequest) 
            this.validationErrors = e.error;         
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
    
    protected loadResource() {
        if (this.resourceCurrentAction() == 'edit' &&
            this.actResourceRoute.snapshot.url[2].path != 'null'){                
                this.actResourceRoute.data.subscribe(
                    (sucess:{resolveResource:T})=>{
                      //o resolveResource deve ser o mesmo nome na variável resolve da rota.. 
                      this.resourceForm.patchValue(sucess.resolveResource);

                    },
                    (error) => this.resourceActionForError(error)
                  );
            }            
    }
}