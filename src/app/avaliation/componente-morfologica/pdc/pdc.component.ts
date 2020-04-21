import { Component, OnInit, Inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
  medidas: any = [];
  newPerimetros: any = [];
  newDiametros: any = [];
  newOutros: any = [];
  selectedTab = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private dialog: MatDialog
  ) {
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
          this.newPerimetros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }


  ngOnInit(): void {
  }


  goBack() {
    this.location.back();
  }

  addPerimetros() {
    this.newPerimetros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addPerim = true;
  }

  savePerimetros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addPerim = false;
  }

  closeInputPerimetros() {
    this.newPerimetros = [];
    this.addPerim = false;
  }


  addDiametros() {
    this.newDiametros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addDiam = true;
  }

  saveDiametros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addDiam = false;
  }
  closeInputDiametros() {
    this.newDiametros = [];
    this.addDiam = false;
  }


  addOutrosPerimetros() {
    this.newOutros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addOutros = true;
  }

  saveOutrosPerimetros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addOutros = false;
  }

  closeInputOutros() {
    this.newOutros = [];
    this.addOutros = false;
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