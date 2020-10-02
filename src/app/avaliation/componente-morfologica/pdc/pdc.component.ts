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
  addPerim = false;
  addDiam = false;
  addOutros = false;
  studentId: number;
  maxPointer = -1;
  pointer = -1;
  editPointer: number;
  editAv = false;
  medidas: any = [];
  newEvaluation: any = [];
  newOutros: any = [];
  selectedTab = 0;
  locale: string;

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
    this.dataService.getData('clients/corporal/' + this.studentId).subscribe(
      (resp: any[]) => {
        this.maxPointer = resp.length;
        if (this.maxPointer > 0) {
          this.medidas = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
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
    console.table(this.newEvaluation);
    this.dataService.saveData('clients/corporal/' + this.studentId, this.newEvaluation).subscribe(
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
    this.dataService.delete('clients/corporal/' + this.studentId + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
  }


  goBack() {
    this.location.back();
  }

  addPerimetros() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.medidas[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.addPerim = true;
  }

  savePerimetros(form) {
    if (form.value.data) {
      this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
        resp => {
          this.getData();
        }
      );
      this.addPerim = false;
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }

  closeInputPerimetros() {
    this.newEvaluation = [];
    this.addPerim = false;
  }


  addDiametros() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.medidas[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.addDiam = true;
  }

  saveDiametros(form) {
    if (form.data) {
      this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
        resp => {
          this.getData();
        }
      );
      this.addDiam = false;
    } else {
    this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
    }
  }
  closeInputDiametros() {
    this.newEvaluation = [];
    this.addDiam = false;
  }


  addOutrosPerimetros() {
    this.newOutros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.medidas[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.addOutros = true;
  }

  saveOutrosPerimetros(form) {
    console.table(form.value);
    if (form.data) {
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addOutros = false;
  } else {
    this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
  }
  }

  closeInputOutros() {
    this.newOutros = [];
    this.addOutros = false;
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
