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
    // Obter os dados da avaliação Corporal para obter o punho e joelho
    this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
      (respm: any[]) => {
        if (respm.length) {
          const corporal = respm.pop();
/*           if (corporal.difdias > 2 ) {
            this.openSnackBar('Atenção! As avaliações dos diametros já tem ' + corporal.difdias + ' dias.', '');
          // this.openMedidasDialog('As avaliações dos diametros já tem ' + corporal.difdias + ' dias.', 'diametros');
          } */
          evaluation.punho = corporal.punho;
          evaluation.joelho = corporal.joelho;
          if (corporal.punho == 0 || corporal.joelho == 0) {
          //  this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação! Diametro do punho e/ou do joelho.', '');
            this.openMedidasDialog('0 - Faltam algumas medições para esta avaliação!', 'corporal');

            this.showChart = false;
          } else {
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

        } else {
      //    this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação! Diametro do punho e/ou do joelho.', '');
          this.openMedidasDialog('Faltam algumas medições para esta avaliação!', 'corporal');
          this.showChart = false;
        }
      }
    );
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

  addEvaluation() {
    this.dataService.getLastEvaluation(this.student.id).subscribe(
      (resp: any[]) => {
        if (resp.length > 0) {
          if (resp[0].difdias > 2) {
            // this.openSnackBar('Atenção! A ultima avaliação complementar já tem ' + resp[0].difdias + ' dias.', '');
            this.openMedidasDialog('A ultima avaliação complementar já tem ' + resp[0].difdias + ' dias.', 'avaliacao');
          }
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
            (respc: any[]) => {
              console.log(respc);
              if (respc.length > 0) {
                const corporal = respc.pop();
                if (corporal.difdias > 2) {
                  this.openMedidasDialog('A ultima avaliação corporal já tem ' + corporal.difdias + ' dias.', 'corporal');
                }
              } else {
                this.openMedidasDialog('Faltam elementos para os calculos.', 'corporal');
              }
            }
          );
          this.addEval = true;
        } else {
        //  this.openSnackBar('Atenção! Não existe nenhuma avaliação de altura e peso.', '');
            this.openMedidasDialog('Não existe nenhuma avaliação de altura e peso.', 'avaliacao');
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

  // diametros Dialog
  openMedidasDialog(msg, tipo): void {
    const dialogRef = this.dialog.open(DialogMedidasDB, {
      width: '350px',
      data: { student : this.student, msg , tipo, evaluation: this.newEvaluation}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if (result === 'Atualizado') {
          this.openSnackBar('Dados atualizados com sucesso', '');
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
  constructor(
                public dialogRef: MatDialogRef<DialogMedidasDB>,
                @Inject(MAT_DIALOG_DATA) public data,
                private dataService: DataService,
                private datapipe: DatePipe
  ) {
    console.log(data);

  }

  save() {
    console.log(this.ev);
    const form: any = {};
    form.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');


    if (this.data.tipo === 'avaliacao') {
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
          this.dialogRef.close('Atualizado');
        }
      );
    }
    if (this.data.tipo === 'corporal') {
      form.altura = this.data.evaluation.altura;
      form.peso = this.data.evaluation.peso;
      form.punho = this.ev.punho;
      form.joelho = this.ev.joelho;
      this.dataService.setData('clients/corporal/' + this.data.student.id, form).subscribe(
        resp => {
          console.log(resp);
          this.dialogRef.close('Atualizado');
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
