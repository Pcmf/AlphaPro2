import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Subscription, interval } from 'rxjs';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ALPHA PRO SYSTEM soluções em avaliações e prescrição de exercicios';
  isLoged: boolean;
  subscription: Subscription;

  constructor(private menuService: MenuService, private data: DataService) {

    this.subscription = this.menuService.getMenu().subscribe(
      resp => {
        this.isLoged = resp;
      }
    );
  }

  ngOnInit() {
    this.menuService.setMenu(this.data.isLoggedIn());
  }
}

