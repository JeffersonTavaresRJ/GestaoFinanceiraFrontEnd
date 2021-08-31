import { Injectable } from "@angular/core";
import { GenericFormResolver } from "src/app/shared/_guards/generic-form-resolver";
import { FormaPagamento } from "../_models/forma-pagamento";
import { FormaPagamentoService } from "../_services/forma-pagamento-service";

@Injectable()
export class FormaPagamentoFormResolver extends GenericFormResolver<FormaPagamento> {
    
    constructor(public formaPagamentoService : FormaPagamentoService ){  
        super(formaPagamentoService);      
    }   
}