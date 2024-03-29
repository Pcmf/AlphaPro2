import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selectedStudent: any = [];

  constructor(
    private dataService: DataService,
    private menuService: MenuService,
    private location: Location
  ) {
    this.menuService.getSelectedStudent().subscribe(
      resp => this.selectedStudent = resp
    );
  }

  ngOnInit(): void {
    if (sessionStorage.selectedStudent) {
      this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
      this.menuService.setSelectedStudent(this.selectedStudent);
    }
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.dataService.logout();
  }

}
