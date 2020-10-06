import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goniometro',
  templateUrl: './goniometro.component.html',
  styleUrls: ['./goniometro.component.scss']
})
export class GoniometroComponent implements OnInit {

  panelOpenState = false;
  evaluation: any = [];
  addMesure = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  selectedStudent: any = [];
  selectedTab = 0;
  protocolo = 39;
  spinner = false;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              public dialogService: DialogService
               ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/flex/' + this.selectedStudent.id + '/'  + this.protocolo).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
        this.spinner = false;
      }
    );
   }

  ngOnInit(): void {
  }


  addMesures() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
      // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
        this.newEvaluation.data = '';
        this.newEvaluation = [];
      }
    this.addMesure = true;
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
    this.dataService.setData('clients/flex/' + this.selectedStudent.id, this.newEvaluation).subscribe(
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
    this.dataService.delete('clients/flex/' + this.selectedStudent.id + '/' + this.protocolo + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
    );
  }



  closeInputs() {
    this.newEvaluation = [];
    this.addMesure = false;
    this.getData();
  }

  saveMesures(form) {
    console.table(form);
    if (form.data) {
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/flex/' + this.selectedStudent.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addMesure = false;
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

/*   addMesureuation() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addMesure = true;
  } */

  swipeLeft(event) {
    if (this.selectedTab < 2) {
      this.selectedTab++;
    }
  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }
  closeInput() {
    this.newEvaluation = [];
    this.addMesure = false;
  }

    // Help Dialog
    openDialog(type): void {
      this.dialogService.openHelp(type);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000, verticalPosition: 'top'
      });
    }

}

