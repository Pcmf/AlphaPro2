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
}
