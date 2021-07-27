import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateFormatToString'
})
export class DateFormatToStringPipe implements PipeTransform {
  
  transform(date: Date): string {
    var dia  = date.getDate().toString();
    var diaF = (dia.length == 1) ? '0'+dia : dia;

    var mes  = (date.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    var mesF = (mes.length == 1) ? '0'+mes : mes;

    var anoF = date.getFullYear();

    return anoF.toString()+"-"+mesF.toString()+"-"+diaF.toString();
  }
}
