import { Injectable } from "@angular/core";
import { GenericListResolver } from "src/app/shared/components/guard-router-generic/guard-router-generic";
import { FormaPagamento } from "../_models/forma-pagamento";
import { FormaPagamentoService } from "../_services/forma-pagamento-service";

@Injectable()
export class FormaPagamentoListResolver extends GenericListResolver<FormaPagamento> {
    
    constructor(public formaPagamentoService : FormaPagamentoService){  
        super(formaPagamentoService);      
    }    
}