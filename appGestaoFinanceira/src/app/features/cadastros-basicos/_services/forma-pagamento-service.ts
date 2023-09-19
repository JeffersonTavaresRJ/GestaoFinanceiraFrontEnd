import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {GenericResourceService} from '../../../shared/_services/generic-resource-service';
import { FormaPagamento } from '../_models/forma-pagamento';
import { catchError } from "rxjs/operators";
import { FormaPagamentoCommandCreate } from './commands/forma-pagamento/forma-pagamento-cmd-create';
import { FormaPagamentoCommandDelete } from './commands/forma-pagamento/forma-pagamento-cmd-delete';
import { FormaPagamentoCommandUpdate } from './commands/forma-pagamento/forma-pagamento-cmd-update';
@Injectable({
    providedIn: 'root'
  })
export class FormaPagamentoService extends GenericResourceService<FormaPagamento>{
    constructor(injector: Injector){
        super(injector, 'api/FormaPagamento',
        FormaPagamentoCommandCreate.convertFormGroupToCommand,
        FormaPagamentoCommandUpdate.convertFormGroupToCommand,
        FormaPagamentoCommandDelete.convertFormGroupToCommand);
    }

    GetAllReportExcel(): Observable<any>{
        this.setApiOption('/GetAllReportExcel');
        return this.http.get(this.getUrl(), {responseType: 'blob'})
          .pipe(catchError(this.handlerError));
    }
}