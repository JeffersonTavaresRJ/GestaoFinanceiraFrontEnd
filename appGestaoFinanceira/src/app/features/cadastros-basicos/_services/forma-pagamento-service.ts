import { Injectable, Injector } from '@angular/core';
import {GenericResourceService} from '../../../shared/_services/generic-resource-service';
import { FormaPagamento } from '../_models/forma-pagamento';
@Injectable({
    providedIn: 'root'
  })
export class FormaPagamentoService extends GenericResourceService<FormaPagamento>{
    constructor(injector: Injector){
        super(injector, 'api/FormaPagamento');
    }
}
