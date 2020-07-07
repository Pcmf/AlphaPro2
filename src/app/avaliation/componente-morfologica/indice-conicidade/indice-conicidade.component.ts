import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  private coefRisco = 1.25;
  locale: string;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
              ) {
    this.locale = this.dataService.getCountryId();
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
    this.dataService.getLastEvaluation(this.selectedStudent.id).subscribe(
      resp => {
        this.lastEvaluation = resp[0];
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
          this.evaluation =  resp.filter((elem) => {
                if (elem.altura > 0 && elem.peso > 0 && elem.cintura > 0){
                  return elem;
                }
          });
          this.maxPointer = this.evaluation.length;
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
