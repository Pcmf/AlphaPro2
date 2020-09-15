import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtocolosCardioService } from 'src/app/services/protocolos-cardio.service';

@Component({
  selector: 'app-cureton',
  templateUrl: './cureton.component.html',
  styleUrls: ['./cureton.component.scss']
})
export class CuretonComponent implements OnInit {
  // All evaluations loaded from db
  evaluation: any = [];
  // evaluations to push to charts
  paramEvaluation: any = [];
  // student phisical condition
  nafs = 0;  // not defined - it will be necessair ask for it in dialogs

  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  student: any = [];
  protocolo = 22;
  newAv: boolean;
  daysAv: any;
  lastAv: any;
  refresh: boolean;
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private protocoloCardio: ProtocolosCardioService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.refresh = true;
          this.setEvaluation(this.evaluation[this.pointer]);
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
          this.refresh = false;
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

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    if (this.selectedEvaluation && this.selectedEvaluation.data === this.datapipe.transform(Date(), 'yyyy-MM-dd')) {
      this.newEvaluation = this.selectedEvaluation;
    }
    // Obter dados da anamnese com o tipo de aluno
    this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
      (respa: any[]) => {
        if (respa && respa.length > 0) {
          this.newEvaluation.nafs = respa[0].nafs;
        }
        // Obter os dados da ultima Avaliação complementar
        this.dataService.getLastEvaluation(this.student.id).subscribe(
          (resp: any[]) => {
            this.newAv = false;
            if (resp.length > 0) {
              this.newEvaluation.imc = resp[0].imc;
              // tslint:disable-next-line: no-conditional-assignment
              if ((this.daysAv = resp[0].difdias) > 2) {
                this.newAv = true;
              }
              this.lastAv = resp.pop();
              if (+this.lastAv.fc === 0) {
                this.newAv = true;
              }
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
                this.newEvaluation
              );
            } else {
              this.newEvaluation.altura = this.lastAv.altura;
              this.newEvaluation.peso = this.lastAv.peso;
              this.newEvaluation.fc2 = this.lastAv.fc;
            }
            this.newEvaluation.sexo = this.student.sexo;
            this.newEvaluation.idade = this.ageService.getAge(this.student.dt_nasc);
            this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
            this.addEval = true;
          }
        );
      }
    );
  }

  save(form) {
    console.log(form);
    form.protocolo = this.protocolo;
    form.c_vo2e = this.protocoloCardio.getVO2Est(form);
    form.c_vo2m = this.protocoloCardio.getVO2OObtCuretonEtAl(form);
    form.c_fai = this.protocoloCardio.getFAI(form.c_vo2e, form.c_vo2m);
    form.c_classefai = this.protocoloCardio.getClasseFAI(form.c_fai);
    form.c_fcreserva = this.protocoloCardio.getFCReserva(form);
    form.c_fcestimada = this.protocoloCardio.getFCEstimada(form.idade);
    form.c_percfcm = this.protocoloCardio.getPercFCMax(form);
    this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.paramEvaluation = [];
        this.addEval = false;
        this.refresh = false;
        this.getData();
      }
    );
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
    console.table(this.newEvaluation);
    this.newEvaluation.protocolo = this.protocolo;
    this.newEvaluation.c_vo2e = this.protocoloCardio.getVO2Est(this.newEvaluation);
    this.newEvaluation.c_vo2m = this.protocoloCardio.getVO2OObtCuretonEtAl(this.newEvaluation);
    this.newEvaluation.c_fai = this.protocoloCardio.getFAI(this.newEvaluation.c_vo2e, this.newEvaluation.c_vo2m);
    this.newEvaluation.c_classefai = this.protocoloCardio.getClasseFAI(this.newEvaluation.c_fai);
    this.newEvaluation.c_fcreserva = this.protocoloCardio.getFCReserva(this.newEvaluation);
    this.newEvaluation.c_fcestimada = this.protocoloCardio.getFCEstimada(this.newEvaluation.idade);
    this.newEvaluation.c_percfcm = this.protocoloCardio.getPercFCMax(this.newEvaluation);
    console.table(this.newEvaluation);
    this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, this.newEvaluation).subscribe(
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
    this.dataService.delete('clients/cardio/' + this.protocolo + '/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
  }



  openMedidasDialog(daysAv: number, newAv: boolean, lastAv: any, newEvaluation: number) {
    const options = {
      daysAv,
      newAv,
      lastAv,
      newEvaluation,
      idade: this.ageService.getAge(this.student.dt_nasc),
      sexo: this.student.sexo,
      id: this.student.id
    };
    console.log(options);
    this.dialogService.openMedidasCardio(options);
    this.dialogService.confirmedMedidasCardio().subscribe(
      result => {
        if (result) {
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

  getnewEvaluation(ev) {
    return 'TODO';
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

  openDialog(type) {
    this.dialogService.openHelp(type);
  }

}
