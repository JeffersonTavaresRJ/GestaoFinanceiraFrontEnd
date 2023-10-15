import { Injectable } from '@angular/core';  
import { ToastrService } from 'ngx-toastr';
import { BSMessage } from 'src/app/core/services/bs-message'; 


@Injectable({
  providedIn: 'root'  
})
export class AlertMessageForm{
    
    constructor(private toastr: ToastrService, private bsMessage: BSMessage){} 

     showSuccess(message: string, title: string){
        this.toastr.success(message, title);
    }
    
    showErrors(messages: string[], title: string){
        this.bsMessage.set("pi pi-exclamation-circle", "error", title, messages);
    }

    showError(message: string, title: string){
        this.toastr.error(message, title);
    }
    
    showInfo(message: string, title: string){
        this.toastr.info(message, title);
        
    }
    
    showWarning(message: string, title: string){
        this.toastr.warning(message, title);
    }

}