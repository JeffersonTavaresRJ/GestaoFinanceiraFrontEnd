import { Injectable } from '@angular/core';  
import { ToastrService } from 'ngx-toastr';
import { BSMessage } from 'src/app/core/services/bs-message'; 


@Injectable({
  providedIn: 'root'  
})
export class AlertMessageForm{
    
    constructor(private toastr: ToastrService, private bsMessage: BSMessage){}
    
    arMessages: string[]=[];

     showSuccess(message: string, codHttpRequest?: number){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-check-circle", "success", codHttpRequest, "Sucesso!", this.arMessages);
    }

    showInfo(message: string, codHttpRequest?: number){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-info-circle", "info", codHttpRequest, "Informação:", this.arMessages);
        
    }
    
    showWarning(message: string, codHttpRequest?: number){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-exclamation-circle", "warn", codHttpRequest, "Atenção:", this.arMessages);
    }
    
    showErrors(messages: string[], codHttpRequest?: number){
        this.bsMessage.set("pi pi-times-circle", "error", codHttpRequest, "Erro:", messages);
    }

    showError(message: string, codHttpRequest?: number){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-times-circle", "error", codHttpRequest, "Erro:", this.arMessages);
    }   
    

}