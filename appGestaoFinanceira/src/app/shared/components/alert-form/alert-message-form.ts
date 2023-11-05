import { Injectable } from '@angular/core';
import { BSMessage } from 'src/app/core/services/bs-message';

@Injectable({
    providedIn: 'root'
})
export class AlertMessageForm {

    constructor(private bsMessage: BSMessage) { }

    arMessages: string[] = [];

    showSuccess(message: string, codHttpRequest?: number) {
        this.arMessages.length = 0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-check-circle", "success", codHttpRequest, this.arMessages);
    }

    showInfo(message: string, codHttpRequest?: number) {
        this.arMessages.length = 0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-info-circle", "info", codHttpRequest, this.arMessages);
    }

    showWarning(message: string, codHttpRequest?: number) {
        this.arMessages.length = 0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-exclamation-triangle", "warn", codHttpRequest, this.arMessages);
    }

    showErrors(messages: string[], codHttpRequest?: number) {
        this.bsMessage.set("pi pi-times-circle", "error", codHttpRequest, messages);
    }

    showError(message: string, codHttpRequest?: number) {
        this.arMessages.length = 0;
        this.arMessages.push(message);
        this.bsMessage.set("pi pi-times-circle", "error", codHttpRequest, this.arMessages);
    }
}