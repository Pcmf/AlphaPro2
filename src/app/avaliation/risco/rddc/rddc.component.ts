import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AgeService } from 'src/app/services/age.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rddc',
  templateUrl: './rddc.component.html',
  styleUrls: ['./rddc.component.scss']
})
export class RDDCComponent implements OnInit, OnDestroy {

  age: number;
  data: any = [];
  risco = 0;
  smoker = '0';
  student: any = [];
  formS: any = [];

  constructor(
    private location: Location,
    private dataService: DataService,
    private ageService: AgeService,
    private router: Router
  ) {
        this.student = JSON.parse(sessionStorage.selectedStudent);
        this.age = this.ageService.getAge(this.student.dt_nasc);
  }


  ngOnInit(): void {

    this.dataService.getData('clients/column/' + this.student.id).subscribe(
      respd => {
        if (respd[0]) {
          console.log(respd);
          this.data = respd[0];
          this.data.smoker = this.smoker;
          this.calcRisco(this.data);
        } else {
          this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
            resp => {
              this.data.smoker = this.smoker;
              if (resp[0].Q510 == 1) {
                this.data.dor = '3';
              }
              this.calcRisco(this.data);
            }
          );
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    form.pontos = +this.risco;
    this.formS = form;
    this.router.navigate(['/avDash']);

  }

  ngOnDestroy() {
    this.dataService.setData('clients/column/' + this.student.id, this.formS).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  calcRisco(form) {
    console.log(form);
    let points = 0;
    if (this.student.fumante == 'S' || this.student.fumante == 'E') {
      this.smoker = '1';
      points += 1;
    }
    if (this.age < 30) {
      points += 0;
    } else if (this.age < 40) {
      points += 1;
    } else if (this.age < 65) {
      points += 2;
    } else {
      points += 3;
    }
    this.risco = points + +this.data.objetos + +this.data.alonga + +this.data.peso + +this.data.dor;
    if (form) {
      form.pontos = +this.risco;
      this.formS = form;
    }
  }

}
