import { Component, OnInit } from '@angular/core';
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
  severityMessage: string;
  messages: string[] = [];



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
        } else {
          this.spinner.hide();
          /*setTimeout(() => {
            spinner ends after 1 seconds 
            this.spinner.hide();
          }, 100);*/
        }

      }
    );

    debugger;
    this.bsMessage.get().subscribe(toastMessage => {

      debugger;
      if (toastMessage.codHttpRequest > 0) {
        this.messages = toastMessage.messages;
        this.iconeMessage = toastMessage.icone;

        if (toastMessage.codHttpRequest == 400) {
          this.messageService.add({ key: 'dialog', sticky: true, severity: toastMessage.severity });
        } else {
          var footer = document.getElementById('footer');
          this.messageFooter(footer, toastMessage.severity);
        }
        this.bsMessage.set(null, null, null, null, null);
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

  messageFooter(footer, severity) {
    if (footer != null) {
      footer.classList.remove('hidden');
      footer.classList.add('footer');
      footer.classList.add(severity);
      setTimeout(function () {
        footer.classList.add('hidden');
      }, 5000);
    }
  }

  onClose() {
    this.messageService.clear('dialog');
  }

}