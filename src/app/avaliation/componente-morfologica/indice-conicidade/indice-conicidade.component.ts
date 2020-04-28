import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location, DatePipe } from '@angular/common';
import { DialogHelpDB } from '../pdc/pdc.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  newEvaluation: any = [];
  lastEvaluation: any = [];
  selectedStudent: any = [];
  selectedTab = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private dialog: MatDialog,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar
              ) {

    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
    this.dataService.getLastEvaluation(this.selectedStudent.id).subscribe(
      resp => {
        this.lastEvaluation = resp[0];
        console.log(this.lastEvaluation);
        if (this.lastEvaluation.difdias > 1) {
          this.openSnackBar('Atenção! Esta avaliação complementar já tem ' + this.lastEvaluation.difdias + ' dias.', '');
        }
      }
    );

  }

  getData() {
    this.dataService.getData('clients/corporal/' + this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  save(form) {
    console.table(form);
    this.dataService.setData('clients/corporal/' + this.selectedStudent.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.newEvaluation.altura = this.lastEvaluation.altura;
    this.newEvaluation.peso = this.lastEvaluation.peso;
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
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

    // Help Dialog
    openDialog(type): void {
      const dialogRef = this.dialog.open(DialogHelpDB, {
        width: '250px',
        data: { type }
      });
    }



}


/* HELP DIALOG  */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-help-db',
  templateUrl: '../../../commun/dialog-help-db.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogHelpDBf {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogHelpDBf>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService
  ) {
    this.dataService.getData('help/' + data.type).subscribe(
      resp => {
        if (resp[0]) {
          this.help = resp[0];
        } else {
          this.help.info = 'Não existe informação!.';
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}