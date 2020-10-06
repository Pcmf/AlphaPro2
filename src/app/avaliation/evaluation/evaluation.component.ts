import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AgeService } from 'src/app/services/age.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  student: any = [];
  locale: string;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private snackBar: MatSnackBar,
    private ageService: AgeService,
    private router: Router
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.idade = this.ageService.getAge(this.student.dt_nasc);
    this.getData();
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'dd/MM/yyyy'); // this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
        this.spinner = false;
      }
    );
  }

  calcTMB(ln) {
    let sexParam = 0;
    this.student.sexo === 'M' ? sexParam = 5 : sexParam = -161;
    if (ln.peso > 0 && ln.altura > 0) {
      const TMB = 10 * ln.peso + 6.25 * ln.altura * 100 - 5 * this.student.idade + sexParam;
      return TMB;
    }
    return 0;
  }

  calcIMC(form) {
    const IMC = (form.peso / Math.pow(form.altura, 2)).toFixed(2);
    return IMC;
  }

  ngOnInit(): void {
  }

  save(form) {
    if (form.data) {
      form.tmb = this.calcTMB(form);
      this.spinner = true;
      this.dataService.setData('clients/eval/' + this.student.id, form).subscribe(
        resp => {
          this.newEvaluation = [];
          this.addEval = false;
          this.spinner = false;
          this.router.navigate(['/avDash']);
        }
      );
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.newEvaluation.avaliador = this.dataService.getUserName();
    if (this.evaluation[this.pointer]) {
      this.newEvaluation.altura = this.evaluation[this.pointer].altura;
      this.newEvaluation.envergadura = this.evaluation[this.pointer].envergadura;
    }
    if (this.maxPointer != -1 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
    this.getData();
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
    this.spinner = true;
    this.dataService.setData('clients/eval/' + this.student.id, this.newEvaluation).subscribe(
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
  }

  delete(evaluation) {
    this.spinner = true;
    this.dataService.delete('clients/eval/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

}
