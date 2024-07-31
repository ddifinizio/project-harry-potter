import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})

export class DurationPipe implements PipeTransform {
    transform(value: string): string {
        const duration = parseInt(value, 10);
        
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
  
      return `${hours}h ${minutes}min`;
    }
  }