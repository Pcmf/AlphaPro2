import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LastEvaluationService } from 'src/app/services/last-evaluation.service';

@Component({
  selector: 'app-all-dobras',
  templateUrl: './all-dobras.component.html',
  styleUrls: ['./all-dobras.component.scss']
})
export class AllDobrasComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  protocolo = 8;
  // graphics
  single: any[];
  single2: any[];
  showChart = false;
  locale: string;
  somatorio = 0;

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;
  spinner = false;

  constructor(
      private location: Location,
      private dataService: DataService,
      private datapipe: DatePipe,
      private snackBar: MatSnackBar,
      public dialogService: DialogService,
      private ageService: AgeService,
      private lastEvalService: LastEvaluationService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.sex = this.student.sexo;
    this.age = this.ageService.getAge(this.student.dt_nasc);
    // start
    this.getData();
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
    this.fatChanged = true;
  }

  getData() {
    /* Protocolo Soma todas as dobras */
    this.spinner = true;
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
          this.maxPointer = -1;
        }
        this.spinner = false;
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
    if (form.data) {
      form.protocolo = this.protocolo;
      this.saveToDB(form);

      /* Durnim & Womersley - 4 dobras  - protocolo 5 */
      if ((this.student.sexo === 'M' && this.age >= 17 && this.age <= 72)
        || (this.student.sexo === 'F' && this.age >= 16 && this.age <= 68)) {
        if (form.triciptal > 0 && form.subescapular > 0 && form.biciptal > 0 && form.suprailiaca > 0) {
          form.protocolo = 5;
          this.saveToDB(form);
        }
      }
      /* Faulkner - 4 dobras  - protocolo 2 */
      if (form.triciptal > 0 && form.subescapular > 0 && form.abdominal > 0 && form.suprailiaca > 0
        && this.student.sexo === 'M') {
        form.protocolo = 2;
        this.saveToDB(form);
      }
      /* Guedes - 3 dobras  - protocolo 1 */
      if (form.triciptal > 0 && form.abdominal > 0 && form.suprailiaca > 0) {
        form.protocolo = 1;
        this.saveToDB(form);
      }
      /* JP3 - 3 dobras  - protocolo 3 */
      if ((this.student.sexo === 'M' && form.peitoral > 0 && form.abdominal > 0 && this.age >= 18 && this.age <= 61)
        || (this.student.sexo === 'F' && form.triciptal > 0 && form.suprailiaca > 0 && form.crural > 0
          && this.age >= 18 && this.age <= 55)) {
        form.protocolo = 3;
        this.saveToDB(form);
      }
      /* JP7 - 7 dobras  - protocolo 4 */
      if (form.triciptal > 0 && form.subescapular > 0 && form.peitoral > 0 && form.suprailiaca > 0
        && form.axilar > 0 && form.abdominal > 0 && form.crural > 0 && this.age >= 18 && this.age <= 55) {
        form.protocolo = 4;
        this.saveToDB(form);
      }
      /* Petroski - 4 dobras  - protocolo 10 */
      if ((this.student.sexo === 'M' && form.triciptal > 0 && form.subescapular > 0 && this.age >= 18 && this.age <= 66)
        || (this.student.sexo === 'F' && form.axilar > 0 && form.crural > 0) && form.geminal > 0 && form.suprailiaca > 0
        && this.age >= 18 && this.age <= 51) {
        form.protocolo = 10;
        this.saveToDB(form);
      }
      /* Slaugther - 2 dobras  - protocolo 6 */
      if (this.age <= 16 && form.triciptal > 0 && form.geminal > 0) {
        form.protocolo = 6;
        this.saveToDB(form);
      }
      /* Sloan - 2 dobras  - protocolo 12 */
      if ((this.student.sexo === 'M' && form.crural > 0 && form.subescapular > 0 && this.age >= 18 && this.age <= 26)
        || (this.student.sexo === 'F' && form.triciptal > 0 && form.suprailiaca > 0 && this.age >= 17 && this.age <= 25)) {
        form.protocolo = 12;
        this.saveToDB(form);
      }
      /* Williams - 4 dobras  - protocolo 11 */
      if (form.triciptal > 0 && form.subescapular > 0 && form.geminal > 0 && form.abdominal > 0
        && (this.student.sexo === 'M' || (this.student.sexo === 'F' && this.age >= 34 && this.age <= 84))) {
        form.protocolo = 11;
        this.saveToDB(form);
      }
      /* Wilmore & Benk - 2 dobras  - protocolo 16 */
      if (this.student.sexo === 'M' && form.crural > 0 && form.abdominal > 0 && this.age >= 16 && this.age <= 37) {
        form.protocolo = 16;
        this.saveToDB(form);
      }
      /* Wilmore & Benk - Mulheres - 3 dobras  - protocolo 15 */
      if (this.student.sexo === 'F' && form.crural > 0 && form.subescapular > 0 && form.triciptal > 0) {
        form.protocolo = 15;
        this.saveToDB(form);
      }
      this.newEvaluation = [];
      this.addEval = false;
      this.getData();
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
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
        if (!resp.erro) {
          this.newEvaluation.altura = resp.altura;
          this.newEvaluation.peso = resp.peso;
          this.newEvaluation.punho = resp.punho;
          this.newEvaluation.joelho = resp.joelho;

          this.somatorio = 0;
          this.newEvaluation.biciptal = 0;
          this.newEvaluation.geminal = 0;
          this.newEvaluation.triciptal = 0;
          this.newEvaluation.peitoral = 0;
          this.newEvaluation.subescapular = 0;
          this.newEvaluation.axilar = 0;
          this.newEvaluation.suprailiaca = 0;
          this.newEvaluation.abdominal = 0;
          this.newEvaluation.crural = 0;
          this.addEval = true;
        }
      }
    );
  }

  // Save to DB
  saveToDB(form) {
    if (form.data) {
      this.spinner = true;
      this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(resp => {
        this.spinner = false;
        return;
      });
    } else {
      console.log(' data indefenida');
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
    this.spinner = true;
    this.dataService.setData('clients/morfo/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        this.spinner = false;
        this.newEvaluation = [];
        this.closeEditForm();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
    this.getData();
  }

  delete(evaluation) {
    this.spinner = true;
    this.dataService.delete('clients/morfo/' + this.student.id + '/' + this.protocolo + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
    );
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
    this.getData();
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

  getSomatorio() {
    this.somatorio = +this.newEvaluation.biciptal + +this.newEvaluation.geminal + +this.newEvaluation.triciptal
      + +this.newEvaluation.peitoral + +this.newEvaluation.subescapular
      + +this.newEvaluation.axilar + +this.newEvaluation.suprailiaca + +this.newEvaluation.abdominal
      + +this.newEvaluation.crural;
  }

}
