import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-pb4',
  templateUrl: './pb4.component.html',
  styleUrls: ['./pb4.component.scss']
})
export class PB4Component implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  protocolo = 10;
  private newAv: boolean;
  private newCorporal: boolean;
  private lastAv: any = [];
  private lastCorporal: any = [];
  private daysAv = 0;
  private daysCorporal = 0;

  // graphics
  chartSelected = 'pie';
  single: any[];
  single2: any[];
  showChart = false;

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private snackBar: MatSnackBar,
    private protocolos: ProtcolosDobrasService,
    private prepareChart: PrepareChartService,
    private ageService: AgeService,
    private dialogService: DialogService
  ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.sex = this.student.sexo;
    this.age = this.ageService.getAge(this.student.dt_nasc);
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
    // Protocolo Petroski  - 10
    this.dataService.getData('clients/morfo/' + this.protocolo + '/' + this.student.id).subscribe(
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
    const proto = this.protocolos.protocoloPetroski(evaluation, this.gorduraDesejada);
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
    form.protocolo = this.protocolo;
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
          if ((this.daysAv = resp[0].difdias) > 2) {
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
    this.dialogService.openHelp(type);
  }

  openMedidasDialog(daysAv, daysCorporal, newAv, newCorporal, lastAv, lastCorporal): void {
    const options = {
      daysAv,
      daysCorporal,
      newAv,
      newCorporal,
      lastAv,
      lastCorporal,
      idade: this.age,
      sexo: this.student.sexo,
      id: this.student.id
    };
    this.dialogService.openMedidas(options);
    this.dialogService.confirmedMedidas().subscribe(
      result => {
        if (result) {
          this.newEvaluation.altura = result.altura;
          this.newEvaluation.peso = result.peso;
          this.newEvaluation.punho = result.punho;
          this.newEvaluation.joelho = result.joelho;
          this.openSnackBar('Dados atualizados com sucesso', '');
          this.addEvaluation();
        } else {
          this.closeInput();
        }
      }
    );
  }
}
