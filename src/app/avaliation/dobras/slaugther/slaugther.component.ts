import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgeService } from 'src/app/services/age.service';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { DialogHelpDB } from '../../componente-morfologica/pdc/pdc.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-slaugther',
  templateUrl: './slaugther.component.html',
  styleUrls: ['./slaugther.component.scss']
})
export class SlaugtherComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];

  // graphics
  single: any[];
  single2: any[];
  showChart = false;

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private ageService: AgeService,
              private protocolos: ProtcolosDobrasService,
              private prepareChart: PrepareChartService,
              private dialog: MatDialog
  ) {

    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    if (this.ageService.getAge(this.student.dt_nasc) > 16) {
      this.openSnackBar('Atenção: Este protocolo não deve ser usado neste aluno!', '');
    }
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
    // Protocolo Slaughter - 6
    this.dataService.getData('clients/morfo/6/' + this.student.id).subscribe(
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
    // Obter os dados do aluno: Avaliações e Corporal para obter o peso, altura, punho e 
    this.dataService.getData('clients/corporal/' + this.student.id + '/' + evaluation.data).subscribe(
      (respm: any[]) => {
        if (respm.length) {
          const corporal = respm.pop();
          evaluation.punho = corporal.punho;
          evaluation.joelho = corporal.joelho;
          if (corporal.punho == 0 || corporal.joelho == 0) {
            this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação! Diametro do punho e/ou do joelho.', '');
            this.showChart = false;
          } else {
            evaluation.sexo = this.student.sexo;
            const proto = this.protocolos.protocoloSlaughter2d(evaluation, this.gorduraDesejada);
            // Create graphic
            this.showChart = true;
            this.single = this.prepareChart.getSingle1(proto);
            Object.assign(this, this.single);
            // Create graphic 2
            this.single2 = this.prepareChart.getSingle2(proto);
            Object.assign(this, this.single2);
          }
        } else {
          this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação!', '');
          this.showChart = false;
        }
      }
    );

  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 6;
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
      resp => {
        if (resp) {
          if (resp[0].difdias > 2) {
            this.openSnackBar('Atenção! Esta avaliação já tem ' + resp[0].difdias + ' dias.', '');
          }
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
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

