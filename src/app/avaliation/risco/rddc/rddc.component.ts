import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-rddc',
  templateUrl: './rddc.component.html',
  styleUrls: ['./rddc.component.scss']
})
export class RDDCComponent implements OnInit {

  age: number;
  data: any = [];
  points = 0;
  smoker = '0';
  student: any = [];

  constructor(private location: Location,
              private dataService: DataService,
              private ageService: AgeService
              ) {
      this.student = JSON.parse(sessionStorage.selectedStudent);

      if (this.student.fumante == 'S' || this.student.fumante == 'E') {
            this.smoker = '1';
            this.points += 1;
          }
      this.age = this.ageService.getAge(this.student.dt_nasc);
      if (this.age < 30 ) {
            this.points += 0;
          } else if (this.age < 40) {
            this.points += 1;
          } else if (this.age < 65) {
            this.points += 2;
          } else {
            this.points += 3;
          }
      this.dataService.getData('clients/column/' + this.student.id).subscribe(
            respd => {
              if (respd[0]) {
                this.data = respd[0];
              }
              this.data.smoker = this.smoker;
            }
          );
        }


  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    form.pontos = +this.points + +form.objetos + +form.alonga + +form.peso + +form.dor;
    this.dataService.setData('clients/column/' + this.student.id, form).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

}
