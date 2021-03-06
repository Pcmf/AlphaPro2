import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-indice-conicidade',
  templateUrl: './indice-conicidade.component.html',
  styleUrls: ['./indice-conicidade.component.scss']
})
export class IndiceConicidadeComponent implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  lastEvaluation: any = [];
  selectedStudent: any = [];
  selectedTab = 0;
  private coefRisco = 1.25;
  locale: string;
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.dataService.getLastEvaluation(this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp.length > 0) {
          this.lastEvaluation = resp[0];
          if (this.lastEvaluation.difdias > 1) {
            this.openSnackBar('Atenção! A última avaliação complementar já tem ' + this.lastEvaluation.difdias + ' dias.', '');
          }
        }
        this.getData();
      }
    );
  }

  getData() {
    this.spinner = true;
    this.dataService.getData('clients/corporal/' + this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        console.log(resp);
        if (resp && resp.length > 0) {
          this.evaluation = resp.filter((elem) => {
            if (elem.altura > 0 && elem.peso > 0 && elem.cintura > 0) {
              return elem;
            }
          });
          this.maxPointer = this.evaluation.length;
          this.pointer = this.maxPointer - 1;

        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
          this.maxPointer = -1;
        }
        this.spinner = false;
      }
    );
  }

  ngOnInit(): void {
  }

  save(form) {
    this.spinner = true;
    if (form.data) {
      this.dataService.setData('clients/corporal/' + this.selectedStudent.id, form).subscribe(
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

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.newEvaluation = [];
    this.newEvaluation.altura = this.lastEvaluation.altura;
    this.newEvaluation.peso = this.lastEvaluation.peso;
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.dataService.getData('clients/corporal/' + this.selectedStudent.id + '/' + this.newEvaluation.data).subscribe(
      (respa: any[]) => {
        if (respa.length > 0) {
          this.newEvaluation.cintura = respa[0].cintura;
        }
              // if already have an evaluation on actual date
        if (this.maxPointer > 0 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
          this.newEvaluation.data = '';
          this.newEvaluation = [];
        }
        this.addEval = true;
      }
    );
  }

  getIC(evaluation) {
    return ((evaluation.cintura / 100) / (0.109 * Math.sqrt((evaluation.peso / evaluation.altura)))).toFixed(2);
  }

  getClasse(evaluation) {
    if (this.selectedStudent.sexo === 'F') {
      this.coefRisco = 1.18;
    }
    if (+this.getIC(evaluation) >= this.coefRisco) {
      return 'Risco Elevado';
    }
    return 'Risco Baixo';
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
    this.spinner = true;
    this.dataService.setData('clients/corporal/' + this.selectedStudent.id, this.newEvaluation).subscribe(
      resp => {
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
    this.dataService.delete('clients/corporal/' + this.selectedStudent.id + '/' + evaluation.data).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
    );
  }

  swipeLeft(event) {
    if (this.selectedTab < 7) {
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

  openDialog(type): void {
    this.dialogService.openHelp(type);
  }
}
