import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boxOffice',
  standalone: true,
})

export class BoxOfficePipe implements PipeTransform {
  transform(value: string): string {
    const cleanedValue: number = parseFloat(value?.replace(/,/g, ''));

    if (isNaN(cleanedValue)) {
      return 'invalid format';
    }

    const formattedValue: string = cleanedValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });

    return formattedValue + ' million';
  }
}