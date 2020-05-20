import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-astrand-ryhming',
  templateUrl: './astrand-ryhming.component.html',
  styleUrls: ['./astrand-ryhming.component.scss']
})
export class AstrandRyhmingComponent implements OnInit {
  // All evaluations loaded from db
  evaluation: any = [];
  // evaluations to push to charts
  paramEvaluation: any = [];
  // student phisical condition
  classe = 0;  // not defined - it will be necessair ask for it in dialogs

  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  student: any = [];
  protocolo = 30;
  newAv: boolean;
  daysAv: any;
  lastAv: any;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService,
              private dialogService: DialogService,
              private snackBar: MatSnackBar
  ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
            respa => {
              this.maxPointer = resp.length;
              this.evaluation = resp;
              this.pointer = this.maxPointer - 1;
              if (respa) {
                this.classe = respa[0].classe;
              } else {
                this.openSnackBar('Faltam dados para o calculo do VO2 Estimado', '');
              }
              resp.map((ln) => {
                this.dataService.getData('clients/eval/' + this.student.id + '/' + ln.data).subscribe(
                  (respe: any[]) => {
                    if (respe && respe.length > 0) {
                      ln.peso = respe[0].peso;
                      ln.altura = respe[0].altura;
                      ln.idade = this.ageService.getAgeFromDate1(ln.data, this.student.dt_nasc);
                      ln.sexo = this.student.sexo;
                      return ln;
                    }
                  }
                );
              });
              setTimeout(() => {
                this.paramEvaluation = resp;
              }, 700);
              this.setEvaluation(this.evaluation[this.pointer]);
            }
          );
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  // Seleciona a data que está a mostrar
  setEvaluation(evaluation) {
    this.selectedEvaluation = evaluation;
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/cardio/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.paramEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
        // Obter dados da anamnese com o tipo de aluno
        this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
          (respa: any[]) => {
            if (respa && respa.length > 0 ) {
              this.classe = respa[0].classe;
            }
            // Obter os dados da ultima Avaliação complementar
            this.dataService.getLastEvaluation(this.student.id).subscribe(
              (resp: any[]) => {
                this.newAv = false;
                if (resp.length > 0) {
                  // tslint:disable-next-line: no-conditional-assignment
                  if ((this.daysAv = resp[0].difdias) > 2) {
                    this.newAv = true;
                  }
                  this.lastAv = resp.pop();
                } else {
                  this.newAv = true;
                }
                // decide se vai mostrar dialog
                if (this.newAv) {
                              console.log('openMedidasDialog');
                              this.openMedidasDialog(
                                this.daysAv,
                                this.newAv,
                                this.lastAv,
                                this.classe
                              );
                } else {
                  console.log('altura ln 143: ' + this.lastAv.altura);
                  this.newEvaluation.altura = this.lastAv.altura;
                  this.newEvaluation.peso = this.lastAv.peso;
                }
                this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
                this.addEval = true;
              }
            );
          }
        );
  }


  openMedidasDialog(daysAv: number, newAv: boolean, lastAv: any, classe: number) {
    const options = {
      daysAv,
      newAv,
      lastAv,
      classe,
      idade: this.ageService.getAge(this.student.dt_nasc),
      sexo: this.student.sexo,
      id: this.student.id
    };
    console.log(options);
    this.dialogService.openMedidasCardio(options);
    this.dialogService.confirmedMedidasCardio().subscribe(
      result => {
        if (result) {
          console.log('Result 172: ' + result);
          this.newEvaluation.altura = result.altura;
          this.newEvaluation.peso = result.peso;
          this.openSnackBar('Dados atualizados com sucesso', '');
          this.addEvaluation();
        } else {
          this.closeInput();
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
