import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-st',
  templateUrl: './st.component.html',
  styleUrls: ['./st.component.scss']
})
export class StComponent implements OnInit {

  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];

  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService
            ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          const tempEvaluation = resp;
          tempEvaluation.forEach(elem => {
            this.dataService.getData('clients/corporal/' + this.student.id + '/' + elem.data).subscribe(
              (respa: any[]) => {
                elem.showEval = false;
                if (respa.length > 0) {
                  elem.joelho = respa[0].joelho;
                  elem.cotovelo = respa[0].cotovelo;
                  elem.bracoc = respa[0].bracoc;
                  elem.pernad = respa[0].pernad;
                  // get morfo data
                  this.dataService.getData('clients/morfo/data/' + this.student.id + '/' + elem.data).subscribe(
                    (respm: any[]) => {
                      if (respm.length > 0) {
                        elem.triciptal = respm[0].triciptal;
                        elem.subescapular = respm[0].subescapular;
                        elem.geminal = respm[0].geminal;
                        elem.suprailiaca = respm[0].suprailiaca;
                        if ( elem.altura > 0 && elem.peso > 0 && elem.joelho > 0 && elem.cotovelo > 0 && elem.triciptal > 0
                            && elem.subescapular > 0 && elem.geminal > 0 && elem.suprailiaca > 0 && elem.bracoc > 0 && elem.pernad > 0 ) {
                              elem.showEval = true;
                          }
                      }
                    }
                  );
                }
              }
            );
          });  // End foreach

          setTimeout(() => {
            const tempEval = [];
            for (const el of tempEvaluation) {
              if (el.showEval) {
                tempEval.push(el);
              }
            }
            this.evaluation = tempEval;
            this.maxPointer = this.evaluation.length;
            this.pointer = this.maxPointer - 1;
      }, 700);

        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }


  calcIP(evaluation) {
    return evaluation.altura * 100 / Math.pow(+evaluation.peso, 1 / 3);
  }

  fatorX(evaluation) {
    const IP = this.calcIP(evaluation);
    let fx = 0;
    if (IP > 40.75) {
      fx = (evaluation.triciptal + evaluation.subescapular + evaluation.suprailiaca) / 10 * 170.18 / evaluation.altura * 100;
    } else if ( IP > 38.28 && IP <=  40.75) {
      fx = 4 + (evaluation.cotovelo + evaluation.joelho + evaluation.bracoc - evaluation.triciptal / 10
                + evaluation.pernad - evaluation.geminal / 10) / 8;
    } else {
      fx = (evaluation.altura * 100) / Math.pow(evaluation.peso, 1 / 3);
    }
    return fx;
  }

  getEndomorfia(evaluation) {
    return 0.858 * evaluation.cotovelo + 0.601 * evaluation.joelho + 0.188 * (evaluation.bracoc - evaluation.triciptal / 10)
          + 0.161 * (evaluation.pernad - evaluation.geminal / 10) - 0.131 * evaluation.altura * 100 + 4.5;
  }

  getMesomorfia(evaluation) {
    return  0.858 * evaluation.cotovelo + 0.601 * evaluation.joelho + 0.188 * ( evaluation.bracoc - evaluation.pernad / 10)
             + 0.161 * (evaluation.pernad - evaluation.geminal / 10) - 0.131 * (evaluation.altura * 100) + 4.5;
  }

  getX(evaluation) {
    return this.fatorX(evaluation) - this.getEndomorfia(evaluation);
  }

  getY(evaluation) {
    return 2 * this.getMesomorfia(evaluation) - this.getEndomorfia(evaluation) - this.fatorX(evaluation);
  }

}
