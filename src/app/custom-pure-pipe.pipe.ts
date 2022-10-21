import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPurePipe',
  pure: true,
})
export class CustomPurePipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('Pure Pipe Triggered.', value);
    return value;
  }
}
