import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.scss']
})
export class ScanerComponent implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];


  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    //
    this.getData();
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
  }

  getData() {
    this.dataService.getData('clients/scan/' + this.student.id).subscribe(
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
    if (form.data) {
    this.dataService.setData('clients/scan/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }

  goBack() {
    this.location.back();
  }

  // Add new Evaluation
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

    // Help Dialog
openDialog(type): void {
  this.dialogService.openHelp(type);
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
  this.dataService.setData('clients/scan/' + this.student.id, this.newEvaluation).subscribe(
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
  this.dataService.delete('clients/scan/' + this.student.id + '/' + evaluation.data).subscribe(
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

}
