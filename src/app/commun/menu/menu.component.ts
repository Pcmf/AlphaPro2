import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selectedStudent: any = [];

  constructor(private dataService: DataService, private menuService: MenuService) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
  }

  ngOnInit(): void {

    this.menuService.getSelectedStudent().subscribe(
      (resp: any) => {
        if (resp) {
          this.selectedStudent = resp;
        }
      }
    );

  }


  logout() {
    this.dataService.logout();
  }

}
