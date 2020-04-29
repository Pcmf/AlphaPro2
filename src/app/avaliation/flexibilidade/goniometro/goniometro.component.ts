import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  newEvaluation: any = [];
  selectedStudent: any = [];
  selectedTab = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              public dialog: MatDialog
               ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/flex/' + this.selectedStudent.id).subscribe(
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
  addMesures() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addMesure = true;
  }
  closeInputs() {
    this.newEvaluation = [];
    this.addMesure = false;
  }

  saveMesures(form) {
    console.table(form.value);
    this.dataService.setData('clients/flex/' + this.selectedStudent.id, form.value).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addMesure = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addMesureuation() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addMesure = true;
  }

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
      this.dialog.open(DialogHelpDB, {
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
export class DialogHelpDB {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogHelpDB>,
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
