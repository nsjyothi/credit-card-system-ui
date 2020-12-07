import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditcard'
})
export class CreditCardSpacingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

}
