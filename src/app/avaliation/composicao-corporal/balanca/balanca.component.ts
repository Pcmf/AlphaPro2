import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-balanca',
  templateUrl: './balanca.component.html',
  styleUrls: ['./balanca.component.scss']
})
export class BalancaComponent implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  editPointer: number;
  editAv = false;
  age: number;
  protocolo = 7;  // Balança

  private newAv: boolean;
  private lastAv: any = [];

  private daysAv = 0;
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.age = this.ageService.getAge(this.student.dt_nasc);
    //
    this.getData();
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
  }



  getData() {
    this.dataService.getData('clients/morfo/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer]);
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


  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = this.protocolo;
    console.log(form);
    form.tmb = this.calcTMB(form);
    // Save
    this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  // Add new Evaluation
  addEvaluation() {
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
              this.openMedidasDialog(
                this.daysAv,
                '',
                this.newAv,
                '',
                this.lastAv,
                ''
              );
            }
        this.newEvaluation.altura = this.lastAv.altura;
        this.newEvaluation.peso = this.lastAv.peso;
        this.newEvaluation.tmb = this.lastAv.tmb;

          }
        );
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;

  }

  calcTMB(ln) {
    console.log(ln);
    console.log(this.age);
    let sexParam = 0;
    this.student.sexo === 'M' ? sexParam = 5 : sexParam = -161;
    if (+ln.peso > 0 && +ln.altura > 0) {
      const TMB = 10 * +ln.peso + 6.25 * +ln.altura * 100 - 5 * +this.age + +sexParam;
      return TMB;
    }
    return 0;
  }


closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  executeAction(param, evaluation, editPointer) {
    if (param.operation === 'Delete' && param.execute) {
      this.delete(evaluation);
    }
    if (param.operation === 'Edit' && param.execute) {
      this.openEditForm(evaluation, editPointer);
    }
    if (param.operation === 'Edit' && !param.execute) {
      this.closeEditForm();
    }
    if (param.operation === 'Save' && param.execute) {
      this.saveEditForm();
    }
  }

  openEditForm(evaluation, editPointer) {
    this.newEvaluation = evaluation;
    this.editAv = true;
    this.editPointer = editPointer;
  }

  saveEditForm() {
    this.newEvaluation.tmb = this.calcTMB(this.newEvaluation);
    console.table(this.newEvaluation);
    this.dataService.setData('clients/morfo/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        console.log(resp);
        this.newEvaluation = [];
        this.closeEditForm();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
  }

  delete(evaluation) {
    this.dataService.delete('clients/morfo/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
  }

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

  // Help Dialog
openDialog(type): void {
    this.dialogService.openHelp(type);
  }

  // Medidas Dialog
openMedidasDialog(daysAv, daysCorporal, newAv, newCorporal, lastAv, lastCorporal): void {
    const options = {
      daysAv,
      daysCorporal,
      newAv,
      newCorporal,
      lastAv,
      lastCorporal,
      idade: this.age,
      sexo: this.student.sexo,
      id: this.student.id
    };
    this.dialogService.openMedidas(options);
    this.dialogService.confirmedMedidas().subscribe(
      result => {
        if (result) {
          this.newEvaluation.altura = result.altura;
          this.newEvaluation.peso = result.peso;
          this.newEvaluation.punho = result.punho;
          this.newEvaluation.joelho = result.joelho;
          this.openSnackBar('Dados atualizados com sucesso', '');
          this.addEvaluation();
        } else {
          this.closeInput();
        }
      }
    );
  }

// Get classification from table
getClassificacao(percGordura) {
  // Feminino
  if (this.student.sexo === 'F') {
    if (this.age >= 20 && this.age < 40) {
      if (percGordura < 21) {
        return 'Baixo';
      } else if (percGordura >= 21 && percGordura < 33) {
        return 'Aceitávél';
      } else if (percGordura >= 33 && percGordura < 39) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    } else if (this.age >= 40 && this.age < 60) {
      if (percGordura < 23) {
        return 'Baixo';
      } else if (percGordura >= 23 && percGordura < 34) {
        return 'Aceitávél';
      } else if (percGordura >= 34 && percGordura < 40) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    } else if (this.age >= 60 && this.age < 80) {
      if (percGordura < 24) {
        return 'Baixo';
      } else if (percGordura >= 24 && percGordura < 36) {
        return 'Aceitávél';
      } else if (percGordura >= 36 && percGordura < 42) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    }
  }
  // Masculino
  if (this.student.sexo === 'M') {
    if (this.age >= 20 && this.age < 40) {
      if (percGordura < 8) {
        return 'Baixo';
      } else if (percGordura >= 8 && percGordura < 20) {
        return 'Aceitávél';
      } else if (percGordura >= 20 && percGordura < 25) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    } else if (this.age >= 40 && this.age < 60) {
      if (percGordura < 11) {
        return 'Baixo';
      } else if (percGordura >= 11 && percGordura < 22) {
        return 'Aceitávél';
      } else if (percGordura >= 22 && percGordura < 28) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    } else if (this.age >= 60 && this.age < 80) {
      if (percGordura < 13) {
        return 'Baixo';
      } else if (percGordura >= 13 && percGordura < 25) {
        return 'Aceitávél';
      } else if (percGordura >= 25 && percGordura < 30) {
        return 'Sobrepeso';
      } else {
        return 'Obesidade';
      }
    }
  }
}


}
