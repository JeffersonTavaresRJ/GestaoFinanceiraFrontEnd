
import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericResourceModel } from "../../models/generic-resource-model";
import { GenericResourceService } from "../../services/generic-resource-service";


@Directive()
export abstract class GenericResourceFormComponent<T extends GenericResourceModel>
    implements OnInit {

    public labelButton: string;
    protected redirectRouterLink : string;
    protected router: Router;
    protected route: ActivatedRoute;    

    constructor(protected injector: Injector,
                protected resourceService: GenericResourceService<T>) {

                    this.router = injector.get(Router);
                    this.route  = injector.get(ActivatedRoute);

    }


    ngOnInit(): void {
    }


    saveResource(formResource){
        if(this.currentAction() =='new'){
            this.createResource(formResource)
        }else{
            this.udpateResource(formResource)
        }
    }

    protected createResource(formResource: any): void {
        this.labelButton = 'Processando...';
        this.resourceService.post(formResource.value)
            .subscribe(
                sucess => this.actionForSucess(),                
                error => this.actionForError()
            );
    }

    protected udpateResource(formResource: any): void {
        this.labelButton = 'Processando...';
        this.resourceService.put(formResource.value)
            .subscribe(
                sucess => this.actionForSucess(),
                error => this.actionForError()
            );
    }

    protected currentAction():string{
        if(this.route.snapshot.url[1].path=='new'){
            return 'new'
        }else{
            return 'edit'
        }
    }

    protected actionForSucess(): void {
               
        if(this.redirectRouterLink != null) {
            this.router.navigate([this.redirectRouterLink]);  
        }else{
            this.labelButton = ''; 
        }  
        
    }

    protected actionForError(): void {
        this.labelButton = ''; 

    }


}