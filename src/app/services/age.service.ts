import { Injectable , Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  constructor() {
   }

   getAge(date) {
                 // calculate age
      const timeDiff = Math.abs(Date.now() - new Date(date).getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
   }

   getAgeFromDate1(date1, date) {
      const timeDiff = Math.abs(new Date(date1).getTime() - new Date(date).getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
   }
}
