import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-frm',
  templateUrl: './frm.component.html',
  styleUrls: ['./frm.component.scss']
})
export class FRMComponent implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  selectedStudent: any = [];
  protocolo = 42;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private dialogservice: DialogService
  ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/testf/' + this.selectedStudent.id + '/' + this.protocolo).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
        this.spinner = false;
      }
    );
  }

  ngOnInit(): void {
  }

  save(form) {
    if (form.data) {
      form.protocolo = this.protocolo;
      this.spinner = true;
      this.dataService.setData('clients/testf/' + this.selectedStudent.id, form).subscribe(
        resp => {
          this.newEvaluation = [];
          this.addEval = false;
          this.spinner = false;
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
    this.spinner = true;
    this.dataService.setData('clients/testf/' + this.selectedStudent.id, this.newEvaluation).subscribe(
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
    this.dataService.delete('clients/testf/' + this.selectedStudent.id + '/' + this.protocolo + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
    );
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
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

  openDialog(type) {
    this.dialogservice.openHelp(type);
  }

  getClassAgachamento(value) {
    if (value > 50) { return 'Excelente'; }
    if (value > 40) { return 'Muito Bom'; }
    if (value > 30) { return 'Bom'; }
    if (value > 20) { return 'Regular'; }
    return 'Fraco';
  }

  getClassAbdominal(value) {
    const idade = this.ageService.getAge(this.selectedStudent.dt_nasc);
    if (this.selectedStudent.sexo === 'M') {
      if (idade >= 15 && idade < 20) {
        if (value >= 48) { return 'Excelente'; }
        if (value >= 42) { return 'Muito Bom'; }
        if (value >= 38) { return 'Bom'; }
        if (value >= 33) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 20 && idade < 30) {
        if (value >= 43) { return 'Excelente'; }
        if (value >= 37) { return 'Muito Bom'; }
        if (value >= 33) { return 'Bom'; }
        if (value >= 29) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 30 && idade < 40) {
        if (value >= 36) { return 'Excelente'; }
        if (value >= 31) { return 'Muito Bom'; }
        if (value >= 27) { return 'Bom'; }
        if (value >= 21) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 40 && idade < 50) {
        if (value >= 31) { return 'Excelente'; }
        if (value >= 26) { return 'Muito Bom'; }
        if (value >= 22) { return 'Bom'; }
        if (value >= 17) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 50 && idade < 60) {
        if (value >= 26) { return 'Excelente'; }
        if (value >= 22) { return 'Muito Bom'; }
        if (value >= 18) { return 'Bom'; }
        if (value >= 13) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 60 && idade < 70) {
        if (value >= 23) { return 'Excelente'; }
        if (value >= 17) { return 'Muito Bom'; }
        if (value >= 12) { return 'Bom'; }
        if (value >= 6) { return 'Regular'; }
        return 'Fraco';
      }
    }
    // FEMALE
    if (this.selectedStudent.sexo === 'F') {
      if (idade >= 15 && idade < 20) {
        if (value >= 42) { return 'Excelente'; }
        if (value >= 36) { return 'Muito Bom'; }
        if (value >= 32) { return 'Bom'; }
        if (value >= 27) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 20 && idade < 30) {
        if (value >= 36) { return 'Excelente'; }
        if (value >= 31) { return 'Muito Bom'; }
        if (value >= 25) { return 'Bom'; }
        if (value >= 21) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 30 && idade < 40) {
        if (value >= 29) { return 'Excelente'; }
        if (value >= 24) { return 'Muito Bom'; }
        if (value >= 20) { return 'Bom'; }
        if (value >= 15) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 40 && idade < 50) {
        if (value >= 25) { return 'Excelente'; }
        if (value >= 20) { return 'Muito Bom'; }
        if (value >= 15) { return 'Bom'; }
        if (value >= 7) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 50 && idade < 60) {
        if (value >= 19) { return 'Excelente'; }
        if (value >= 12) { return 'Muito Bom'; }
        if (value >= 5) { return 'Bom'; }
        if (value >= 3) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 60 && idade < 70) {
        if (value >= 16) { return 'Excelente'; }
        if (value >= 12) { return 'Muito Bom'; }
        if (value >= 4) { return 'Bom'; }
        if (value >= 2) { return 'Regular'; }
        return 'Fraco';
      }
    }
  }

  getClassFlex(value) {
    const idade = this.ageService.getAge(this.selectedStudent.dt_nasc);
    if (this.selectedStudent.sexo === 'M') {
      if (idade >= 15 && idade < 20) {
        if (value >= 39) { return 'Excelente'; }
        if (value >= 29) { return 'Muito Bom'; }
        if (value >= 23) { return 'Bom'; }
        if (value >= 18) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 20 && idade < 30) {
        if (value >= 36) { return 'Excelente'; }
        if (value >= 29) { return 'Muito Bom'; }
        if (value >= 22) { return 'Bom'; }
        if (value >= 17) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 30 && idade < 40) {
        if (value >= 30) { return 'Excelente'; }
        if (value >= 22) { return 'Muito Bom'; }
        if (value >= 17) { return 'Bom'; }
        if (value >= 12) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 40 && idade < 50) {
        if (value >= 22) { return 'Excelente'; }
        if (value >= 17) { return 'Muito Bom'; }
        if (value >= 13) { return 'Bom'; }
        if (value >= 10) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 50 && idade < 60) {
        if (value >= 21) { return 'Excelente'; }
        if (value >= 13) { return 'Muito Bom'; }
        if (value >= 10) { return 'Bom'; }
        if (value >= 7) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 60 && idade < 70) {
        if (value >= 18) { return 'Excelente'; }
        if (value >= 11) { return 'Muito Bom'; }
        if (value >= 8) { return 'Bom'; }
        if (value >= 5) { return 'Regular'; }
        return 'Fraco';
      }
    }
    // FEMALE
    if (this.selectedStudent.sexo === 'F') {
      if (idade >= 15 && idade < 20) {
        if (value >= 33) { return 'Excelente'; }
        if (value >= 25) { return 'Muito Bom'; }
        if (value >= 18) { return 'Bom'; }
        if (value >= 12) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 20 && idade < 30) {
        if (value >= 30) { return 'Excelente'; }
        if (value >= 21) { return 'Muito Bom'; }
        if (value >= 15) { return 'Bom'; }
        if (value >= 10) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 30 && idade < 40) {
        if (value >= 27) { return 'Excelente'; }
        if (value >= 20) { return 'Muito Bom'; }
        if (value >= 13) { return 'Bom'; }
        if (value >= 8) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 40 && idade < 50) {
        if (value >= 24) { return 'Excelente'; }
        if (value >= 15) { return 'Muito Bom'; }
        if (value >= 11) { return 'Bom'; }
        if (value >= 5) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 50 && idade < 60) {
        if (value >= 21) { return 'Excelente'; }
        if (value >= 11) { return 'Muito Bom'; }
        if (value >= 7) { return 'Bom'; }
        if (value >= 2) { return 'Regular'; }
        return 'Fraco';
      }
      if (idade >= 60 && idade < 70) {
        if (value >= 17) { return 'Excelente'; }
        if (value >= 12) { return 'Muito Bom'; }
        if (value >= 5) { return 'Bom'; }
        if (value >= 2) { return 'Regular'; }
        return 'Fraco';
      }
    }
  }

}
