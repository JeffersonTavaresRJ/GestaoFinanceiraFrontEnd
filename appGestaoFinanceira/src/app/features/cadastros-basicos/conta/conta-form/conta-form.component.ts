import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { GenericResourceFormComponent } from 'src/app/shared/components/generic-resource-form/generic-resource-form-component';
import { Conta } from '../../_models/conta-model';
import { ContaService } from '../../_services/conta-service';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})
export class ContaFormComponent extends GenericResourceFormComponent<Conta> {
  
  constructor(protected injector: Injector,
              private contaService: ContaService) {
    super(injector, contaService, '/conta');
   }

   protected buildResourceForm() {
     this.resourceForm = this.resourceFormBuilder.group({
       id:[null],
       descricao: [null,Validators.required],
       status:[null],
       defaultConta:[null]
     });
    }

     protected resourceCreatePageTitle():string{
      return 'Cadastro de Conta';
    }
  
    protected resourceEditPageTitle():string{
      return 'Edição de Conta';
    }
  }