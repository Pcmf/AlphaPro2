import { Component, OnInit, Inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pdc',
  templateUrl: './pdc.component.html',
  styleUrls: ['./pdc.component.scss']
})
export class PDCComponent implements OnInit {
  addEval = false;

  studentId: number;
  maxPointer = -1;
  pointer = -1;
  editPointer: number;
  editAv = false;
  medidas: any = [];
  newEvaluation: any = [];
  selectedTab = 0;
  locale: string;
  spinner = false;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.studentId = JSON.parse(sessionStorage.selectedStudent).id;
    this.getData();
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/corporal/' + this.studentId).subscribe(
      (resp: any[]) => {
        this.maxPointer = resp.length;
        if (this.maxPointer > 0) {
          this.medidas = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
          this.maxPointer = -1;
        }
        this.spinner = false;
      }
    );
  }


  ngOnInit(): void { }

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
    this.dataService.saveData('clients/corporal/' + this.studentId, this.newEvaluation).subscribe(
      resp => {
        console.log(resp);
        this.newEvaluation = [];
        this.spinner = false;
        this.closeEditForm();
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
    this.dataService.delete('clients/corporal/' + this.studentId + '/' + evaluation.data).subscribe(
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
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.medidas[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.addEval = true;
  }

  saveEvaluation(form) {
    if (form.data) {
      this.spinner = true;
      this.dataService.saveData('clients/corporal/' + this.studentId, form).subscribe(
        resp => {
          this.spinner = false;
          this.getData();
        }
      );
      this.addEval = false;
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }

  closeInputEvaluation() {
    this.newEvaluation = [];
    this.addEval = false;
    this.getData();
  }


  swipeLeft(event) {
    if (this.selectedTab < 3) {
      this.selectedTab++;
    }
  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
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
}
