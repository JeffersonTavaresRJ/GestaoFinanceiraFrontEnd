import { Pipe, PipeTransform } from '@angular/core';
import{DateConvert} from 'src/app/shared/functions/date-convert';

@Pipe({
  name: 'DateUTC'
})
export class DateUTCPipe implements PipeTransform {
  
  transform(date: string): string {
    if (date != undefined || date != null){
      var _date = DateConvert.stringToDate(date, '-');
      var dia  = _date.getDate().toString();
      var diaF = (dia.length == 1) ? '0'+dia : dia;

      var mes  = (_date.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      var mesF = (mes.length == 1) ? '0'+mes : mes;

      var anoF = _date.getFullYear();
      return diaF.toString()+"/"+mesF.toString()+"/"+anoF.toString();
    }
    return "";    
  }
}
