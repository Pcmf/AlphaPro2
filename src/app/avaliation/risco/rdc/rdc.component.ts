import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-rdc',
  templateUrl: './rdc.component.html',
  styleUrls: ['./rdc.component.scss']
})
export class RDCComponent implements OnInit {

  data: any = [];
  id: number;
  sex: string;
  risco = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private actRoute: ActivatedRoute,
              private ageService: AgeService,
              private router: Router
              ) {
    this.id = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/rdc/' + this.id).subscribe(
      resp => {
        if (resp[0]) {
          this.data = resp[0];
        }
        // data from cad_aluno
        this.dataService.getData('clients/' + this.id).subscribe(
          respa => {
            this.data.afs = respa[0].afs;
            this.data.qtos = respa[0].qtos;
            this.sex = respa[0].sexo;
            // calculate age
            this.data.idade = this.ageService.getAge(respa[0].dt_nasc);
          }
        );
        // historic cardio family from arq_quest - Q31QTDE
        this.dataService.getData('clients/anamnese/' + this.id).subscribe(
          respq => this.data.hf = respq[0].Q31QTDE
        );
        this.calcRisco(this.data);
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
    this.dataService.setData('clients/rdc/' + this.id, form).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['rddc/', this.id]);
      }
    );
  }

  calcRisco(ln) {
    this.risco = 0;
    if (ln.qtas >= 140) {
      this.risco++;
    }
    if (ln.qtad >= 90) {
      this.risco++;
    }
    if (ln.qtos >= 20) {
      this.risco++;
    }
    if (ln.lsc >= 250 || ln.lsf >= 4.5 || ln.lst >= 130 || ln.lsg >= 110) {
      this.risco++;
    }
    if (ln.diabetes == 1 && ln.idade >= 35) {
      this.risco += 2;
    }
    if (ln.diabetes == 2 && ln.idade >= 30) {
      this.risco += 2;
    }
    if (ln.diabetes == 3) {
      this.risco += 2;
    }
    if (this.sex == 'M' && ln.gc >= 25) {
      this.risco++;
    }
    if (this.sex == 'F' && ln.gc >= 32) {
      this.risco++;
    }
    if (ln.st > 2) {
      this.risco++;
    }
    if (ln.hf > 2) {
      this.risco++;
    }
    if (ln.afs <= 1 || ln.af50 < 30) {
      this.risco++;
    }
    if (ln.idade > 50) {
      this.risco++;
    }


  }

}
