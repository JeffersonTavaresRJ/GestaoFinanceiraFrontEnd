import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StringSubstr'
})
export class StringSubstrPipe implements PipeTransform {

  transform(value: string, start: number, length:number): unknown {
    debugger;
    var x = value.substring(start, length);
    return x;
  }

}
