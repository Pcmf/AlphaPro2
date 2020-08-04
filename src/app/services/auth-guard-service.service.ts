import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private loginService: DataService,
    private router: Router) { }

  canActivate() {
    console.log('check');
    console.log(this.loginService.isLoggedIn());
    if (this.loginService.isLoggedIn()) {
      console.log('TRUE');
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

