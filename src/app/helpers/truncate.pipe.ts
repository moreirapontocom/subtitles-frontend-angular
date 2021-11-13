import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform = (value: string, args: number) => {
    return value && value.length >= args
      ? value.substr(0, args) + '...'
      : value;
  };
}
