import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesToMegabytes',
})
export class BytesToMegabytesPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return (value * 0.000001).toFixed(2);
  }
}
