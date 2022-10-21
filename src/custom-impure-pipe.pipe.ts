import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customImpurePipe',
  // pure: false,
})
export class CustomImpurePipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('Impure Pipe Triggered.', value);
    return value;
  }
}
