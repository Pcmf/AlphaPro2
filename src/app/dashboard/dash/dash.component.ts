import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  students: any =  [];
  student = {};
  selectedS = false;
  id = '';
  constructor(private dataService: DataService, private menuService: MenuService) {

      const id = this.dataService.getPTId();
      this.dataService.getData('entity/clients/' + id).subscribe(
        resp =>  {
          this.students = resp;
        }
      );

  }


  ngOnInit(): void {
    // tslint:disable-next-line: no-conditional-assignment
    if (sessionStorage.getItem('selectedStudent')) {
      this.student = JSON.parse(sessionStorage.getItem('selectedStudent'));
      this.selected(JSON.parse(sessionStorage.getItem('selectedStudent')));
     }
  }

  selected(student) {
    if (student) {
      this.selectedS = true;
      this.id = student.id;
      this.menuService.setSelectedStudent(student);
      sessionStorage.selectedStudent = JSON.stringify(student);
    } else {
      this.reset();
    }
  }

  reset() {
    this.student = {};
    this.selectedS = false;
    this.id = '';
    this.menuService.setSelectedStudent({});
    sessionStorage.removeItem('selectedStudent');
  }

}
