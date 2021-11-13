import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatus',
})
export class JobStatusPipe implements PipeTransform {
  transform = (value: string, args: string) => {
    let status = { label: '', style: '' };
    switch (value) {
      case '0created':
        status = { label: 'Missing Setup', style: 'bg-warning text-dark' };
        break;

      case '1not_started':
        status = { label: 'To Do', style: 'bg-secondary' };
        break;

      case '2in_progress':
        status = { label: 'In Progress', style: 'bg-primary' };
        break;

      case '3completed':
        status = { label: 'Complete', style: 'bg-success' };
        break;

      case '4published':
        status = { label: 'Published', style: 'bg-danger' };
        break;

      default:
        status = { label: '--', style: 'bg-primary' };
        break;
    }

    return (args === "label") ? status.label : status.style;
  };
}
