import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-jp3',
  templateUrl: './jp3.component.html',
  styleUrls: ['./jp3.component.scss']
})
export class JP3Component implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  age: number;
  protocolo = 3;

  // graphics
  chartSelected = 'pie';
  single: any[];
  single2: any[];
  showChart = false;
  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;
  private newAv: boolean;
  private newCorporal: boolean;
  private lastAv: any = [];
  private lastCorporal: any = [];
  private daysAv = 0;
  private daysCorporal = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService,
              private snackBar: MatSnackBar,
              private protocolos: ProtcolosDobrasService,
              private prepareChart: PrepareChartService,
              public dialog: MatDialog
  ) {

    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.age = this.ageService.getAge(this.student.dt_nasc);
    if (this.student.sexo === 'M' && (this.age < 18 || this.age > 61)) {
      this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
    }
    if (this.student.sexo === 'F' && (this.age < 18 || this.age > 55)) {
      this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
    }
    //
    this.getData();
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

  getData() {
    /* Protocolo Jackson Pollok 3d - 3 */
    this.dataService.getData('clients/morfo/3/' + this.student.id).subscribe(
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
    this.startGraphics(evaluation);
  }

  // Iniciar os graficos
  startGraphics(evaluation) {
            evaluation.idade = this.age;
            evaluation.sexo = this.student.sexo;
            const proto = this.protocolos.protocoloJacksonPollok3d(evaluation, this.gorduraDesejada);
            // Create graphic
            this.showChart = true;
            this.single = this.prepareChart.getSingle1(proto);
            Object.assign(this, this.single);
            // Create graphic 2
            this.single2 = this.prepareChart.getSingle2(proto);
            Object.assign(this, this.single2);
  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 3;
    console.log(this.student.id);
    this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(
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

  // Add new Evaluation
  addEvaluation() {
    // Obter os dados da ultima Avaliação complementar
    this.dataService.getLastEvaluation(this.student.id).subscribe(
      (resp: any[]) => {
        this.newAv = false;
        if (resp.length > 0) {
          // tslint:disable-next-line: no-conditional-assignment
          if ( (this.daysAv = resp[0].difdias) > 2) {
            this.newAv = true;
          }
          this.lastAv = resp.pop();
        } else {
          this.newAv = true;
        }
        // Obter os dados da ultima avaliação corporal - punho e joelho
        this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
          (respc: []) => {
            if (respc.length > 0) {
              this.lastCorporal = respc.pop();
              this.newCorporal = false;
              // tslint:disable-next-line: no-conditional-assignment
              if ((this.daysCorporal = this.lastCorporal.diffdias) > 2
                  || +this.lastCorporal.punho == 0
                  || +this.lastCorporal.joelho == 0) {
                this.newCorporal = true;
              }
            } else {
              this.newCorporal = true;
            }
           // decide se vai mostrar dialog
            if (this.newAv || this.newCorporal) {
              this.openMedidasDialog(
                                      this.daysAv,
                                      this.daysCorporal,
                                      this.newAv,
                                      this.newCorporal,
                                      this.lastAv,
                                      this.lastCorporal
                                    );
            }
            this.newEvaluation.altura = this.lastAv.altura;
            this.newEvaluation.peso = this.lastAv.peso;
            this.newEvaluation.punho = this.lastCorporal.punho;
            this.newEvaluation.joelho = this.lastCorporal.joelho;
          }
        );
      }
    );
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
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

  // Medidas Dialog
  openMedidasDialog(daysAv, daysCorporal, newAv, newCorporal, lastAv, lastCorporal): void {
    const dialogRef = this.dialog.open(DialogMedidasDB, {
      width: '350px',
      data: {
              student: this.student,
              daysAv,
              daysCorporal,
              evaluation: this.newEvaluation,
              newAv, newCorporal,
              lastAv,
              lastCorporal
            }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.newEvaluation.altura = result.altura;
          this.newEvaluation.peso = result.peso;
          this.newEvaluation.punho = result.punho;
          this.newEvaluation.joelho = result.joelho;
          this.openSnackBar('Dados atualizados com sucesso', '');
          this.addEvaluation();
        }
      }
    );
  }

}



/* Altura, Peso, Punho e Joelho. Dialog - para introduzir estas medidas quando não existem.  */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-medidas-db',
  templateUrl: '../../../commun/dialog-medidas-db.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogMedidasDB {
  ev: any = [];
  question = true;
  msg = '';
  erroAltura = false;
  erroPeso = false;
  erroPunho = false;
  erroJoelho = false;
  erro = false;
  constructor(
    public dialogRef: MatDialogRef<DialogMedidasDB>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService,
    private datapipe: DatePipe
  ) {
    console.log(data);
    if (data.newAv && data.daysAv) {
      this.msg += 'A ultima avaliação de altura e peso já tem ' + data.daysAv + ' dias.';
    }
    if (data.newCorporal && data.daysCorporal) {
      this.msg += '\n A ultima medição do punho e joelho já tem ' + data.daysCorporal + ' dias.';
    }
    if (this.msg) {
      this.msg += '\n Altere ou adicione novos:';
    }
    this.ev.altura = data.lastAv.altura;
    this.ev.peso = data.lastAv.peso;
    this.ev.punho = data.lastCorporal.punho;
    this.ev.joelho = data.lastCorporal.joelho;

  }

  save() {
    this.erroAltura = false;
    this.erroPeso = false;
    this.erroPunho = false;
    this.erroJoelho = false;
    this.erro = false;
    console.log(this.ev);
    if (!this.ev.altura || +this.ev.altura == 0) {
      this.erroAltura = true;
      this.erro = true;
    }
    if (!this.ev.peso || +this.ev.peso == 0) {
      this.erroPeso = true;
      this.erro = true;
    }
    if (!this.ev.punho || +this.ev.punho == 0) {
      this.erroPunho = true;
      console.log(this.erroPunho);
      this.erro = true;
    }
    if (!this.ev.joelho || +this.ev.joelho == 0) {
      this.erroJoelho = true;
      this.erro = true;
    }

    if (!this.erro) {
      const form: any = {};
      form.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');


      form.altura = this.ev.altura;
      form.peso = this.ev.peso;
      form.avaliador = this.dataService.getUserName();
      let sexParam = 0;
      this.data.student.sexo === 'M' ? sexParam = 5 : sexParam = -161;
      form.tmb = 10 * this.ev.peso + 6.25 * this.ev.altura * 100 - 5 * this.data.student.idade + sexParam;
      form.imc = this.ev.peso / Math.pow(this.ev.altura, 2);
      this.dataService.setData('clients/eval/' + this.data.student.id, form).subscribe(
          resp => {
            console.log(resp);
            form.altura = this.ev.altura;
            form.peso = this.ev.peso;
            form.punho = this.ev.punho;
            form.joelho = this.ev.joelho;
            this.dataService.setData('clients/corporal/' + this.data.student.id, form).subscribe(
                respc => {
                console.log(respc);
                this.dialogRef.close(this.ev);
                }
            );
          }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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
