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
  // smoker = '0';
  fumante = false;
  qtos: number;
  student: any = [];
  formS: any = [];
  classRisco: string;
  spinner = false;

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
    this.spinner = true;
    this.dataService.getData('clients/' + this.student.id).subscribe(
      respa => {
        this.qtos = respa[0].qtos;
        // Obter os dados guardados sobre coluna
        this.dataService.getData('clients/column/' + this.student.id).subscribe(
          respd => {
            if (respd[0]) {
              this.data = respd[0];
              // obter se tem queixas de dor de costas
              this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
                resp => {
                  if (resp[0].Q510 == '1') {
                    this.data.dor = '3';
                  }
                }
              );
            }
            if (respa[0].fumante === 'S' || respa[0].fumante === 'E') {
              this.data.smoker = '1';
              this.fumante = true;
            } else if (respa[0].fumante === 'N' && this.qtos == 0) {
              this.data.smoker = '0';
              this.fumante = true;
            } else  {
              this.data.smoker = null;
              this.fumante = false;
            }
            this.calcRisco(this.data);
          }
        );
        this.spinner = false;
      }
    );
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    form.pontos = +this.risco;
    this.spinner = true;
    this.dataService.setData('clients/column/' + this.student.id, form).subscribe(
      resp => {
        console.log(resp);
        this.spinner = false;
      }
    );
    if (form.smoker === '1') {
      form.fumante = 'S';
    }
    this.spinner = true;
    this.dataService.setData('clients/anamnese/' + this.student.id, form).subscribe(
      res => {
        console.log(res);
        this.spinner = false;
        this.router.navigate(['/avDash']);
      }
    );
  }

  ngOnDestroy() {
  }

  calcRisco(form) {
    console.log(form);
    let points = 0;
    this.risco = 0;
    console.log(form.smoker);
    if ((form.smoker && form.smoker === '1') || (this.fumante && this.data.smoker != '0')) {
      console.log('fumante');
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
    if (form.objetos) { this.risco += +form.objetos; }
    if (form.alonga) { this.risco += +form.alonga; }
    if (form.dor) { this.risco += +form.dor; }

    this.risco += points;
    if (form) {
      form.pontos = +this.risco;
      this.formS = form;
    }
    if (this.risco < 0 ) {
      this.risco = 0;
    }
    if (this.risco < 5) {
      this.classRisco = 'background-green';
    }
    if (this.risco >= 5 && this.risco < 13) {
      this.classRisco = 'background-yellow';
    }
    if (this.risco >= 13) {
      this.classRisco = 'background-red';
    }
    console.log(this.risco);
  }

}
