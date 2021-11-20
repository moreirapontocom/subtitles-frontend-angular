import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class ComposeUserFullNamePipe implements PipeTransform {
  transform = (user: any) => {
    return `${user.first_name} ${user.last_name}`;
  };
}
