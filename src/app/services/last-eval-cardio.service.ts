import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { AgeService } from './age.service';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class LastEvalCardioService {
  private newAv: boolean;
  private lastAv: any = [];
  private daysAv = 0;
  private response: any = [];

  private evaluation = new BehaviorSubject([]);
  lastEval = this.evaluation.asObservable();

  constructor(
    private dataService: DataService,
    public dialogService: DialogService,
    private ageService: AgeService,
    private snackBar: MatSnackBar
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
        // decide se vai mostrar dialog
        if (this.newAv) {
          this.openMedidasDialog(
            this.daysAv,
            this.newAv,
            this.lastAv,
            this.ageService.getAgeFromDate1(data, student.dt_nasc),
            student.sexo,
            student.id
          );
        } else {
          this.response.altura = this.lastAv.altura;
          this.response.peso = this.lastAv.peso;
          this.response.fc = this.lastAv.fc;
          this.response.imc = this.lastAv.imc;
          this.response.sexo = student.sexo;
          this.response.idade = this.ageService.getAge(student.dt_nasc);
          this.response.erro = false;
          this.evaluation.next(this.response);
        }
      }
    );
  }

  openMedidasDialog(daysAv: number, newAv: boolean, lastAv: any, age: number, sexo: string, id: number) {
    const options = {
      daysAv,
      newAv,
      lastAv,
      nafs: 0,
      idade: age,
      sexo,
      id
    };
    this.dialogService.openMedidasCardio(options);
    this.dialogService.confirmedMedidasCardio().subscribe(
      result => {
        if (result) {
          this.response.altura = result.altura;
          this.response.peso = result.peso;
          this.response.imc = result.peso / Math.pow(result.altura, 2);
          this.response.fc = result.fc;
          this.response.nafs = 0;
          this.response.sexo = sexo;
          this.response.idade = age;
          this.openSnackBar('Dados atualizados com sucesso', '');
          this.response.erro = false;
        } else {
          this.response.erro = true;
        }
        this.evaluation.next(this.response);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

}
