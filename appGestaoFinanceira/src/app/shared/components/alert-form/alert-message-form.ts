import { Injectable } from '@angular/core';  
import { ToastrService } from 'ngx-toastr';
import { BSMessage } from 'src/app/core/services/bs-message'; 


@Injectable({
  providedIn: 'root'  
})
export class AlertMessageForm{
    
    constructor(private toastr: ToastrService, private bsMessage: BSMessage){}
    
    arMessages: string[]=[];

     showSuccess(message: string){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-check-circle", "success", this.arMessages);
    }

    showInfo(message: string){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-info-circle", "info", this.arMessages);
        
    }
    
    showWarning(message: string){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-exclamation-circle", "warn", this.arMessages);
    }
    
    showErrors(messages: string[]){
        this.bsMessage.set("pi pi-times-circle", "error", messages);
    }

    showError(message: string){
        this.arMessages.length=0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-times-circle", "error", this.arMessages);
    }   
    

}