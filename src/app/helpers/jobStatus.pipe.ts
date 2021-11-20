import { Pipe, PipeTransform } from '@angular/core';
import { HelpersService } from './helpers';

@Pipe({
  name: 'jobStatus',
})
export class JobStatusPipe implements PipeTransform {
  constructor(private helpers: HelpersService) { }

  transform = (value: string, args: string) => {
    const status: any = this.helpers.availableJobStatus.find(item => item.id === value)
    return (args === "label") ? status.label : status.style;
  };
}
