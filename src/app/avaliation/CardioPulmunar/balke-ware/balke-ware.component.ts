import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtocolosCardioService } from 'src/app/services/protocolos-cardio.service';
import { LastEvalCardioService } from 'src/app/services/last-eval-cardio.service';

@Component({
  selector: 'app-balke-ware',
  templateUrl: './balke-ware.component.html',
  styleUrls: ['./balke-ware.component.scss']
})
export class BalkeWareComponent implements OnInit {
  // All evaluations loaded from db
  evaluation: any = [];
  // evaluations to push to charts
  paramEvaluation: any = [];
  // student phisical condition
  nafs = 0;  // not defined - it will be necessair ask for it in dialogs
  age: number;
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  student: any = [];
  protocolo = 27;
  newAv: boolean;
  daysAv: any;
  lastAv: any;
  refresh: boolean;
  locale: string;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private protocoloCardio: ProtocolosCardioService,
    private lastEvalService: LastEvalCardioService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.age = this.ageService.getAge(this.student.dt_nasc)
    this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
      (respa: any[]) => {
        this.nafs = 0;
        if (respa && respa.length > 0) {
          if (respa[0].nafs >= 0) {
            this.nafs = respa[0].nafs;
          }
        }
        this.getData();
      }
    );
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.evaluation.nafs = this.nafs;
          this.evaluation.sexo = this.student.sexo;
          this.evaluation.idade = this.age;
          this.pointer = this.maxPointer - 1;
          this.refresh = true;
          this.setEvaluation(this.evaluation[this.pointer]);
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
        this.spinner = false;
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
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }

    // Obter dados das avaliações complementares e ultima corporal
    this.lastEvalService.getLastEvaluation(this.student, this.newEvaluation.data);
    this.lastEvalService.lastEval.subscribe(
      (resp: any) => {
        if (resp.erro != undefined && !resp.erro) {
          this.newEvaluation.altura = resp.altura;
          this.newEvaluation.peso = resp.peso;
          this.newEvaluation.fc2 = resp.fc;
          this.newEvaluation.imc = resp.imc;
          this.newEvaluation.sexo = resp.sexo;
          this.newEvaluation.idade = resp.idade;
          this.newEvaluation.nafs = this.nafs;
          this.addEval = true;
        }
      }
    );
  }


  save(form) {
    if (form.data) {
      form.protocolo = this.protocolo;
      form.sexo = this.student.sexo;
      form.idade = this.age;
      form.nafs = this.nafs;
      form.c_vo2e = this.protocoloCardio.getVO2Est(form);
      form.c_vo2m = this.protocoloCardio.getVO2ObtBalke(form);
      form.c_fai = this.protocoloCardio.getFAI(form.c_vo2e, form.c_vo2m);
      form.c_classefai = this.protocoloCardio.getClasseFAI(form.c_fai);
      form.c_fcreserva = this.protocoloCardio.getFCReserva(form);
      form.c_fcestimada = this.protocoloCardio.getFCEstimada(form.idade);
      form.c_percfcm = this.protocoloCardio.getPercFCMax(form);
      this.spinner = true;
      this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, form).subscribe(
        resp => {
          this.newEvaluation = [];
          this.spinner = false;
          this.refresh = false;
          this.addEval = false;
          this.getData();
        }
      );
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
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
    this.newEvaluation.protocolo = this.protocolo;
    this.newEvaluation.sexo = this.student.sexo;
    this.newEvaluation.idade = this.age;
    this.newEvaluation.nafs = this.nafs;
    this.newEvaluation.c_vo2e = this.protocoloCardio.getVO2Est(this.newEvaluation);
    this.newEvaluation.c_vo2m = this.protocoloCardio.getVO2ObtBalke(this.newEvaluation);
    this.newEvaluation.c_fai = this.protocoloCardio.getFAI(this.newEvaluation.c_vo2e, this.newEvaluation.c_vo2m);
    this.newEvaluation.c_classefai = this.protocoloCardio.getClasseFAI(this.newEvaluation.c_fai);
    this.newEvaluation.c_fcreserva = this.protocoloCardio.getFCReserva(this.newEvaluation);
    this.newEvaluation.c_fcestimada = this.protocoloCardio.getFCEstimada(this.newEvaluation.idade);
    this.newEvaluation.c_percfcm = this.protocoloCardio.getPercFCMax(this.newEvaluation);
    this.spinner = true;
    this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        this.spinner = false;
        this.newEvaluation = [];
        this.closeEditForm();
        this.refresh = false;
        this.getData();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
  }

  delete(evaluation) {
    this.spinner = true;
    this.dataService.delete('clients/cardio/' + this.protocolo + '/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.refresh = false;
        this.getData();
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
    this.getData();
  }


  openDialog(type) {
    this.dialogService.openHelp(type);
  }

}
