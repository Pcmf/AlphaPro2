import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LastEvaluationService } from 'src/app/services/last-evaluation.service';

@Component({
  selector: 'app-faulkner4',
  templateUrl: './faulkner4.component.html',
  styleUrls: ['./faulkner4.component.scss']
})
export class Faulkner4Component implements OnInit {
  @ViewChild('triciptal') triciptal: ElementRef;
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  somatorio = 0;
  protocolo = 2;
  locale: string;

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
    private dialogService: DialogService,
    private lastEvalService: LastEvaluationService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.sex = this.student.sexo;
    this.age = this.ageService.getAge(this.student.dt_nasc);
    this.getData();
  }

  ngOnInit(): void { }

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


  save(form) {
    if (form.data) {
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
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

  // Add new Evaluation
  addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    // Obter dados das avaliações complementares e ultima corporal
    this.lastEvalService.getLastEvaluation(this.student, this.newEvaluation.data);
    this.lastEvalService.lastEval.subscribe(
      (resp: any) => {
        this.newEvaluation.altura = resp.altura;
        this.newEvaluation.peso = resp.peso;
        this.newEvaluation.punho = resp.punho;
        this.newEvaluation.joelho = resp.joelho;
      }
    );

    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    this.somatorio = 0;
    this.newEvaluation.biciptal = 0;
    this.newEvaluation.geminal = 0;
    this.newEvaluation.triciptal = 0;
    this.newEvaluation.peitoral = 0;
    this.newEvaluation.subescapular = 0;
    this.newEvaluation.axilar = 0;
    this.newEvaluation.suprailiaca = 0;
    this.newEvaluation.abdominal = 0;
    this.newEvaluation.crural = 0;
    this.addEval = true;
    // tslint:disable-next-line: no-string-literal
    const ele = this.triciptal.nativeElement;
    console.log(ele);
    if (ele) {
      ele.focus();
    }
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
    console.table(this.newEvaluation);
    this.dataService.setData('clients/morfo/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        this.startGraphics(this.newEvaluation);
        this.newEvaluation = [];
        this.closeEditForm();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
  }

  delete(evaluation) {
    this.dataService.delete('clients/morfo/' + this.student.id + '/' + this.protocolo + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
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
    this.dialogService.openHelp(type);
  }

  getSomatorio() {
    this.somatorio = +this.newEvaluation.biciptal + +this.newEvaluation.geminal + +this.newEvaluation.triciptal
      + +this.newEvaluation.peitoral + +this.newEvaluation.subescapular
      + +this.newEvaluation.axilar + +this.newEvaluation.suprailiaca + +this.newEvaluation.abdominal
      + +this.newEvaluation.crural;
  }

}
