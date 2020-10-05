import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-ircq',
  templateUrl: './ircq.component.html',
  styleUrls: ['./ircq.component.scss']
})
export class IRCQComponent implements OnInit {

  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  age: number;
  locale: string;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.age = this.ageService.getAge(this.student.dt_nasc);
    this.getData();
  }
  getData() {
    this.spinner = true;
    this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.evaluation = resp.filter((elem) => {
            if (elem.cintura > 0 && elem.quadril > 0) {
              return elem;
            }
          });
          this.maxPointer = this.evaluation.length;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
          this.maxPointer = -1;
        }
        this.spinner = false;
      }
    );
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
  // Help Dialog
  openDialog(type): void {
    this.dialogService.openHelp(type);
  }

  getClasse(ln) {
    const ircq = ln.cintura / ln.quadril;
    if (this.student.sexo == 'M') {
      /* 20 - 29 */
      if (this.age < 29 && ircq < 0.83) {
        return 1;
      }
      if (this.age < 29 && ircq >= 0.83 && ircq < 89) {
        return 2;
      }
      if (this.age < 29 && ircq >= 0.89 && ircq < 94) {
        return 3;
      }
      if (this.age < 29 && ircq >= 94) {
        return 4;
      }
      /* 30 - 39 */
      if (this.age >= 30 && this.age < 40 && ircq < 0.84) {
        return 1;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.84 && ircq < 0.91) {
        return 2;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.91 && ircq < 0.96) {
        return 3;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.96) {
        return 4;
      }
      /* 40 - 49 */
      if (this.age >= 40 && this.age < 50 && ircq < 0.88) {
        return 1;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 0.88 && ircq < 0.95) {
        return 2;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 0.96 && ircq < 1) {
        return 3;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 1) {
        return 4;
      }
      /* 50 - 59 */
      if (this.age >= 50 && this.age < 60 && ircq < 0.9) {
        return 1;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 0.9 && ircq < 0.96) {
        return 2;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 0.96 && ircq < 1.02) {
        return 3;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 1.02) {
        return 4;
      }
      /* > 60 */
      if (this.age >= 60 && ircq < 0.91) {
        return 1;
      }
      if (this.age >= 60 && ircq >= 0.91 && ircq < 0.98) {
        return 2;
      }
      if (this.age >= 60 && ircq >= 0.98 && ircq < 1.03) {
        return 3;
      }
      if (this.age >= 60 && ircq >= 1.03) {
        return 4;
      }
    }

    /*  Mulheres */
    if (this.student.sexo == 'F') {
      /* 20 - 29 */
      if (this.age < 29 && ircq < 0.71) {
        return 1;
      }
      if (this.age < 29 && ircq >= 0.71 && ircq < 77) {
        return 2;
      }
      if (this.age < 29 && ircq >= 0.77 && ircq < 82) {
        return 3;
      }
      if (this.age < 29 && ircq >= 82) {
        return 4;
      }
      /* 30 - 39 */
      if (this.age >= 30 && this.age < 40 && ircq < 0.72) {
        return 1;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.72 && ircq < 0.78) {
        return 2;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.78 && ircq < 0.84) {
        return 3;
      }
      if (this.age >= 30 && this.age < 40 && ircq >= 0.84) {
        return 4;
      }
      /* 40 - 49 */
      if (this.age >= 40 && this.age < 50 && ircq < 0.73) {
        return 1;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 0.73 && ircq < 0.79) {
        return 2;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 0.79 && ircq < 0.87) {
        return 3;
      }
      if (this.age >= 40 && this.age < 50 && ircq >= 0.87) {
        return 4;
      }
      /* 50 - 59 */
      if (this.age >= 50 && this.age < 60 && ircq < 0.74) {
        return 1;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 0.74 && ircq < 0.81) {
        return 2;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 0.81 && ircq < 0.88) {
        return 3;
      }
      if (this.age >= 50 && this.age < 60 && ircq >= 0.88) {
        return 4;
      }
      /* > 60 */
      if (this.age >= 60 && ircq < 0.76) {
        return 1;
      }
      if (this.age >= 60 && ircq >= 0.76 && ircq < 0.83) {
        return 2;
      }
      if (this.age >= 60 && ircq >= 0.83 && ircq < 0.9) {
        return 3;
      }
      if (this.age >= 60 && ircq >= 0.9) {
        return 4;
      }
    }
  }


}
