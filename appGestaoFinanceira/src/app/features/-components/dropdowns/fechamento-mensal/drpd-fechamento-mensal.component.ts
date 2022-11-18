import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FechamentoModel } from 'src/app/features/lancamentos/_models/fechamento-model';
import { FechamentoService } from 'src/app/features/lancamentos/_services/fechamento-service';
import { DateConvert } from 'src/app/shared/functions/date-convert';

@Component({
  selector: 'app-dropdown-fechamento-mensal',
  templateUrl: './drpd-fechamento-mensal.component.html',
  styleUrls: ['./drpd-fechamento-mensal.component.css']
})
export class DropDownFechamentoMensalComponent {

  arFechamentosMensais:FechamentoModel[];
  fechamentoModel: FechamentoModel;
  selectedMesAno: string;  
  @Input('OnPopulate') onPopulate: boolean;
  @Output('OnChange') _onChange = new EventEmitter(); 

  constructor(protected fechamentoService: FechamentoService) {  
    if (this.onPopulate){
      this.populate();
    }      
  }

  populate(){
    this.fechamentoService.getAll().subscribe(
      sucess=>{
       // debugger;
        this.arFechamentosMensais = sucess;
        console.log("populate dropdwon");
        this.getFechamento();
      }
    );
  }

  getFechamento(){
    var interval = setInterval(()=>{
      this.onChange();
      //só pára de executar o onChange() quando o mês/ano estiver selecionado no dropdown..
      if(this.selectedMesAno!=null){clearInterval(interval)}},10);
  }

  onChange(){
  //  debugger;
    //enviando o objeto para o componente pai..
    if (this.selectedMesAno!=null){
      this.fechamentoModel = this.arFechamentosMensais
          .filter(x=>DateConvert.formatDateYYYYMMDD(x.dataReferencia, '-')==DateConvert.formatDateYYYYMMDD(this.selectedMesAno, '-'))[0];
      this._onChange.emit(this.fechamentoModel); 
    }
  }
}
