import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashComponent implements OnInit {
  students: any =  [];
  student: any = [];
  selectedS = false;
  spinner = false;


  constructor(
    private dataService: DataService,
  ) {
      this.spinner = true;
      const id = this.dataService.getPTId();
      this.dataService.getData('entity/clients/' + id).subscribe(
        resp =>  {
          this.students = resp;
          this.spinner = false;
        }
      );

  }


  ngOnInit(): void {
    this.dataService.changeMorfoExp(false);
    this.dataService.changeDobrasExp(false);
    // tslint:disable-next-line: no-conditional-assignment
    if (sessionStorage.getItem('selectedStudent')) {
      this.student = JSON.parse(sessionStorage.getItem('selectedStudent'));
      this.selected(JSON.parse(sessionStorage.getItem('selectedStudent')));
     }
  }

  selected(student) {
    if (student) {
      this.selectedS = true;
      sessionStorage.selectedStudent = JSON.stringify(student);
      this.dataService.changeAluno(student);
    } else {
      this.reset();
    }
  }

  reset() {
    this.student = {};
    this.selectedS = false;
    sessionStorage.removeItem('selectedStudent');
    this.dataService.changeAluno([]);
  }

}
