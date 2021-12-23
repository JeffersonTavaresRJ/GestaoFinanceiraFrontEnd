import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {GenericResourceService} from '../../../shared/_services/generic-resource-service';
import { FormaPagamento } from '../_models/forma-pagamento';
import { FormaPagamentoCommandCreate } from './commands/forma-pagamento/forma-pagamento-cmd-create';
import { FormaPagamentoCommandDelete } from './commands/forma-pagamento/forma-pagamento-cmd-delete';
import { FormaPagamentoCommandUpdate } from './commands/forma-pagamento/forma-pagamento-cmd-update';
@Injectable({
    providedIn: 'root'
  })
export class FormaPagamentoService extends GenericResourceService<FormaPagamento>{
    constructor(injector: Injector){
        super(injector, 'api/FormaPagamento',
        FormaPagamentoCommandCreate.convertModelToCommand,
        FormaPagamentoCommandUpdate.convertModelToCommand,
        FormaPagamentoCommandDelete.convertModelToCommand);
    }
}