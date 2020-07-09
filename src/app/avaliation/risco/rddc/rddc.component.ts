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
  classRisco: string;

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

    // Obter dados quantos cigarros dia
    this.dataService.getData('clients/' + this.student.id).subscribe(
      respa => {
        // Obter os dados guardados sobre coluna
        this.dataService.getData('clients/column/' + this.student.id).subscribe(
          respd => {
            if (respd[0]) {
              this.data = respd[0];
            //  this.calcRisco(this.data);
            } else {
              // obter se tem queixas de dor de costas
              this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
                resp => {
                  if (resp[0].Q510 == 1) {
                    this.data.dor = '3';
                  }
                  // this.calcRisco(this.data);
                }
              );
            }
            if (respa[0].fumante === 'S' || respa[0].fumante === 'E') {
              this.data.smoker = '1';
            } else {
              this.data.smoker = '0';
            }
            console.log(this.data.smoker);
            this.calcRisco(this.data);
          }
        );
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
    let points = 0;
    this.risco = 0;
    if (form.smoker && form.smoker == '1') {
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
    this.risco = points + +form.objetos + +form.alonga + +form.peso + +form.dor;
    if (form) {
      form.pontos = +this.risco;
      this.formS = form;
    }
    console.log(this.risco);
    if (this.risco < 5) {
      this.classRisco = 'background-green';
    }
    if (this.risco >= 5 && this.risco < 13) {
      this.classRisco = 'background-yellow';
    }
    if (this.risco >= 13) {
      this.classRisco = 'background-red';
    }
  }

}
