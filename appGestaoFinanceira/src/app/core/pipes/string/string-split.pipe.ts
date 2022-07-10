import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringSplit'
})
export class StringSplitPipe implements PipeTransform {

  transform(value: string, delimitador: string, posicao: number): string {
    var arValues = value.split(delimitador);
    return arValues[posicao];
  }

}
