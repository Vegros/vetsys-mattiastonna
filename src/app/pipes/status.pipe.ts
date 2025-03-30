import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
  name: 'generateStatus',
  standalone: true
})
export class generateStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]) {

    const [datePart, timePart] = value.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    const parsedDate = new Date(+year, +month - 1, +day, +hours, +minutes);
    const now = new Date();
    return parsedDate < now


  }

}
