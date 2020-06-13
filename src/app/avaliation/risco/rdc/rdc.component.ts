import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-rdc',
  templateUrl: './rdc.component.html',
  styleUrls: ['./rdc.component.scss']
})
export class RDCComponent implements OnInit {

  student: any = [];
  rdcData: any = [];
  sex: string;
  risco = 0;

  constructor(
    private location: Location,
    private dataService: DataService,
    private ageService: AgeService,
    private router: Router
  ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.idade = this.ageService.getAge(this.student.dt_nasc);
    this.sex = this.student.sexo;
    this.dataService.getData('clients/rdc/' + this.student.id).subscribe(
      resp => {
        if (resp[0]) {
          this.rdcData = resp[0];
        }
        // Obter dados quantos cigarros dia
        dataService.getData('clients/' + this.student.id).subscribe(
          respa => {
            this.rdcData.qtos = respa[0].qtos;
          }
        );

    //    if (this.rdcData.qtas == 0 || this.rdcData.qtad == 0) {
        this.dataService.getData('clients/eval/' + this.student.id).subscribe(
              (respe: any[]) => {
                if (respe) {
                  const lastEval = respe.pop();
                  this.rdcData.qtas = lastEval.tamax;
                  this.rdcData.qtad = lastEval.tamin;
                }
              }
            );
      //    }
            // historic cardio family from pat_familiar
        this.dataService.getData('patfam/' + this.student.id + '/Cardiopatia').subscribe(
              (respq: any[]) => {
                console.log(respq.length);
                this.rdcData.hf = respq.length;
              }
            );
        this.calcRisco();
        //  }
      }
    );
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    console.table(form);
    this.dataService.setData('clients/rdc/' + this.student.id, form).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['rddc/']);
      }
    );
  }

  calcRisco() {
    this.risco = 0;
    if (this.rdcData.qtas >= 140) {
      this.risco++;
    }
    if (this.rdcData.qtad >= 90) {
      this.risco++;
    }
    if (this.student.qtos >= 20) {
      this.risco++;
    }
    if (this.rdcData.lsc >= 250 || this.rdcData.lsf >= 4.5 || this.rdcData.lst >= 130 || this.rdcData.lsg >= 110) {
      this.risco++;
    }
    if (this.rdcData.diabetes == 1 && this.student.idade >= 35) {
      this.risco += 2;
    }
    if (this.rdcData.diabetes == 2 && this.student.idade >= 30) {
      this.risco += 2;
    }
    if (this.rdcData.diabetes == 3) {
      this.risco += 2;
    }
    if (this.sex == 'M' && this.rdcData.gc >= 25) {
      this.risco++;
    }
    if (this.sex == 'F' && this.rdcData.gc >= 32) {
      this.risco++;
    }
    if (this.rdcData.st > 2) {
      this.risco++;
    }
    if (this.rdcData.hf > 2) {
      this.risco++;
    }
    if (this.student.afs <= 1 || this.rdcData.af50 < 30) {
      this.risco++;
    }
    if (this.student.idade > 50) {
      this.risco++;
    }


  }

}
