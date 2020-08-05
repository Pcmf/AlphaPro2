import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-name',
  templateUrl: './header-name.component.html',
  styleUrls: ['./header-name.component.scss']
})
export class HeaderNameComponent implements OnInit {

  studentName: string;

  constructor() {
    this.studentName = JSON.parse(sessionStorage.selectedStudent).nome;
   }

  ngOnInit(): void {
  }

}
