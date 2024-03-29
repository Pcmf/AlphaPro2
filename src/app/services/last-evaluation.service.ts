import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AgeService } from './age.service';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LastEvaluationService {
  private newAv: boolean;
  private newCorporal: boolean;
  private lastAv: any = [];
  private lastCorporal: any = [];
  private daysAv = 0;
  private daysCorporal = 0;
  private response: any = [];

  private evaluation = new BehaviorSubject([]);
  lastEval = this.evaluation.asObservable();

  constructor(
    private dataService: DataService,
    public dialogService: DialogService,
    private ageService: AgeService
  ) { }


  getLastEvaluation(student, data) {
    // Obter os dados da ultima Avaliação complementar
    this.dataService.getLastEvaluation(student.id).subscribe(
      (resp: any[]) => {
        this.newAv = false;
        if (resp.length > 0) {
          // tslint:disable-next-line: no-conditional-assignment
          if ((this.daysAv = resp[0].difdias) > 2) {
            this.newAv = true;
          }
          this.lastAv = resp.pop();
        } else {
          this.lastAv = [];
          this.newAv = true;
        }
        // Obter os dados da ultima avaliação corporal - punho e joelho
        this.dataService.getData('clients/corporal/' + student.id).subscribe(
          (respc: []) => {
            if (respc.length > 0) {
              this.lastCorporal = respc.pop();
              this.newCorporal = false;
              // tslint:disable-next-line: no-conditional-assignment
              if ((this.daysCorporal = this.lastCorporal.difdias) > 2
                || +this.lastCorporal.punho == 0
                || +this.lastCorporal.joelho == 0) {
                this.newCorporal = true;
              }
            } else {
              this.lastCorporal = [];
              this.newCorporal = true;
            }
            console.log(this.lastCorporal);
            // decide se vai mostrar dialog
            if (this.newAv || this.newCorporal) {
              this.openMedidasDialog(
                this.daysAv,
                this.daysCorporal,
                this.newAv,
                this.newCorporal,
                this.lastAv,
                this.lastCorporal,
                this.ageService.getAgeFromDate1(data, student.dt_nasc),
                student.sexo,
                student.id
              );
            } else {
              this.response.altura = this.lastAv.altura;
              this.response.peso = this.lastAv.peso;
              this.response.punho = this.lastCorporal.punho;
              this.response.joelho = this.lastCorporal.joelho;

              this.response.erro = false;
              this.evaluation.next( this.response);
            }
          }
        );
      }
    );
  }

  openMedidasDialog(daysAv, daysCorporal, newAv, newCorporal, lastAv, lastCorporal, age, sexo, id): void {
    const options = {
      daysAv,
      daysCorporal,
      newAv,
      newCorporal,
      lastAv,
      lastCorporal,
      idade: age,
      sexo,
      id
    };
    this.dialogService.openMedidas(options);
    this.dialogService.confirmedMedidas().subscribe(
      result => {
        console.log(result);
        if (result) {
          this.response.altura = result.altura;
          this.response.peso = result.peso;
          this.response.punho = result.punho;
          this.response.joelho = result.joelho;
          this.response.erro = false;
        } else {
          this.response.erro = true;

        }
        this.evaluation.next( this.response);

      }
    );
  }


}
