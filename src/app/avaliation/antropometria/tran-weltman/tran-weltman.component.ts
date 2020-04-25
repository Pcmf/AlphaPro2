import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHelpDB } from '../../componente-morfologica/pdc/pdc.component';

@Component({
  selector: 'app-tran-weltman',
  templateUrl: './tran-weltman.component.html',
  styleUrls: ['./tran-weltman.component.scss']
})
export class TranWeltmanComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  // graphics
  single: any[];
  single2: any[];
  showChart = false;
  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService,
              private snackBar: MatSnackBar,
              private protocolos: ProtcolosDobrasService,
              private prepareChart: PrepareChartService,
              private dialog: MatDialog
  ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.age = this.ageService.getAge(this.student.dt_nasc);
    this.sex = this.student.sexo;
    this.getData();
  }

  // Protocolo Tran & Weltman - 14
  getData() {
    this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          // update age for every evaluation with evaluation date and birthdate
          this.evaluation.map((elem) => {
            elem.idade = this.ageService.getAgeFromDate1(elem.data, this.student.dt_nasc);
          });
          this.pointer = this.maxPointer - 1;
          /* this.moreData(); */
          this.setEvaluation(this.evaluation[this.pointer]);
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }
  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
    this.fatChanged = true;
  }
  saveFatChange() {
    this.student.percgd = this.gorduraDesejada;
    sessionStorage.selectedStudent = JSON.stringify(this.student);
    this.dataService.setData('entity/clients/' + this.student.entity + '/' + this.student.id, this.student).subscribe(
      resp => this.getData()
    );
    this.fatChanged = false;
  }
  // Seleciona a data que está a mostrar
  setEvaluation(evaluation) {
    this.selectedEvaluation = evaluation;
    this.startGraphics(evaluation);
  }

  // Iniciar os graficos
  startGraphics(evaluation) {
    // Obter os dados do aluno: Avaliações e Corporal para obter o peso, altura, punho e 
/*     this.dataService.getData('clients/eval/' + this.student.id + '/' + evaluation.data).subscribe(
      (respa: any[]) => {
        if (respa.length) { */
                const proto = this.protocolos.protocoloTranWeltman(evaluation, this.gorduraDesejada);
                // Create graphic
                this.showChart = true;
                this.single = this.prepareChart.getSingle1(proto);
                Object.assign(this, this.single);
                // Create graphic 2
                this.single2 = this.prepareChart.getSingle2(proto);
                Object.assign(this, this.single2);

/*         } else {
          this.openSnackBar('Atenção: Não existem avaliações complementares para esta data!', '');
          this.showChart = false;
        }
      }
    ); */
  }

/*   moreData() {
    const evaluationFinal = this.evaluation.forEach(elem => {
      this.dataService.getData('clients/eval/' + this.student.id + '/' + elem.data).subscribe(
        (respa: any[]) => {
          if (respa.length > 0) {
            elem.idade = this.ageService.getAgeFromDate1(elem.data, this.student.dt_nasc);
            elem.peso = respa[0].peso;
            elem.altura = respa[0].altura;
            elem.imc = respa[0].imc;
          } else {
            elem.idade = 1;
            elem.peso = 1;
            elem.altura = 1;
            elem.imc = 1;
          }
          console.table(elem);
        }
      );
    });
    return evaluationFinal;
  } */


  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 14;
    this.dataService.setData('clients/corporal/' + this.student.id, form).subscribe(
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
    this.dataService.getLastEvaluation(this.student.id).subscribe(
      resp => {
        if (resp) {
          if (resp[0].difdias > 2) {
            this.openSnackBar('Atenção! Esta avaliação já tem ' + resp[0].difdias + ' dias.', '');
          }
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
          this.newEvaluation.idade = this.age;
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          console.log(this.newEvaluation);
          this.addEval = true;
        } else {
          this.openSnackBar('Atenção! Não existe nenhuma avaliação de altura e peso.', '');
        }
      }
    );
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

    // Help Dialog
    openHelpDialog(type): void {
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
export class DialogHelpDBc {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogHelpDBc>,
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

