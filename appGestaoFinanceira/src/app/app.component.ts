import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BSHttpLoading } from './core/services/bs-http-loading';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BSMessage } from './core/services/bs-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gestao Financeira';
  titleMessage: string;
  iconeMessage: string;
  severityOld: string;
  closeError: boolean;
  messages: any[] = [];
  footer:any;
  cont: number=0;

  constructor(private bsHttpLoading: BSHttpLoading,
    private bsMessage: BSMessage,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private config: PrimeNGConfig
  ) {

    this.bsHttpLoading.getLoading().subscribe(
      value => {
        if (value) {
          this.spinner.show();
          this.footer=document.getElementById('footer');   
          this.footer.classList.add('hidden');       
        } else {
          console.log("getLoading: "+ value);
          this.spinner.hide();          
          this.message();
        }
      });

    this.config.setTranslation({
      "startsWith": "Começa com",
      "contains": "Contém",
      "notContains": "Não contém",
      "endsWith": "Termina com",
      "equals": "Igual",
      "notEquals": "Não seja igual",
      "noFilter": "Não filtrar",
      "lt": "Menor que",
      "lte": "Menor ou igual a",
      "gt": "Maior que",
      "gte": "Maior ou igual a",
      "is": "É",
      "isNot": "Não é",
      "before": "Antes",
      "after": "Depois",
      "clear": "Limpar",
      "apply": "Aplicar",
      "matchAll": "Combinar tudo",
      "matchAny": "Corresponder a qualquer",
      "addRule": "Adicionar Regra",
      "removeRule": "Remover Regra",
      "accept": "Sim",
      "reject": "Não",
      "choose": "Escolher",
      "upload": "Upload",
      "cancel": "Cancelar",
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      "dayNamesMin": ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
      "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Hoje",
      "weekHeader": "Wk",
      "weak": "Mínimo",
      "medium": "Médio",
      "strong": "Negrito",
      "passwordPrompt": "Digite a senha",
      "emptyMessage": "Dados não encontrados",
      "emptyFilterMessage": "Dados não encontrados"
    });

  }

  onClose() {
    this.messageService.clear('dialog');
    this.footer.classList.add('hidden');
  }

  private message(){
    debugger;
    this.bsMessage.get().subscribe(toastMessage => {
      if (toastMessage.severity != null) {
        debugger;
        this.messages = toastMessage.messages;
        this.iconeMessage = toastMessage.icone;

        if (toastMessage.codHttpRequest == 400) {
          console.log("dialog: "+ ++this.cont);
          console.log("severity: "+ toastMessage.severity);
          this.messageService.add({ key: 'dialog', sticky: true, severity: toastMessage.severity });
        } else {
          this.messageFooter(toastMessage.severity);
        }
        this.bsMessage.clear();
      }
    });
  }

  private messageFooter(severity) {
    if (this.footer != null) {

      this.footer.classList.remove(this.severityOld);
      this.footer.classList.remove('hidden');

      this.footer.classList.add('footer');
      this.footer.classList.add(severity);

      this.closeError = severity == "error";

      if (this.closeError == false) {
        setTimeout(function () {
          this.footer.classList.add('hidden');
        }, 5000);
      }

      if (this.severityOld != severity) {
        this.severityOld = severity;
      }
    }
  }

}