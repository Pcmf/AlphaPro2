import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class LoginComponent implements OnInit {
  erro: boolean;

  constructor(private dataService: DataService, private router: Router, private menuService: MenuService) {
    this.erro = false;
   }

  submit(form) {
    this.dataService.checkUser(form, 'elogin').subscribe(
      resp => {
        if (resp) {
          this.menuService.setMenu(true);
          this.router.navigate(['/dash']);
        } else {
          this.erro = true;
        }

      }
    );

  }

  ngOnInit() {
  }

}
