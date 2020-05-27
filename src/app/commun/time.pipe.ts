import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: string): string {
    console.log(+time);

    const min = Math.trunc(+time);
    console.log(min);
    console.log(+(+time - +min) * 100);
    const sec = (Math.round(+(+time - min) * 100)).toString();
    if (+sec < 10) {
      return min + ':' + '0' + sec;
    }
    return min + ':' + sec;
  }

}
