import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { DialogService } from 'src/app/services/dialog.service';

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
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  protocolo = 14;
  // graphics
  single: any[];
  single2: any[];
  showChart = false;
  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;
  chartSelected = 'pie';
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private protocolos: ProtcolosDobrasService,
    private prepareChart: PrepareChartService,
    public dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
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
          // Select only the ones that have all values cintura, quadril, altura
          this.evaluation = resp.filter((el) => {
            return el.altura > 0 && el.cintura > 0 && el.quadril > 0;
          });
        }
        if (this.evaluation.length > 0) {
          this.maxPointer = this.evaluation.length;
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
                const proto = this.protocolos.protocoloTranWeltman(evaluation, this.gorduraDesejada);
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
    this.dataService.setData('clients/corporal/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        console.log(resp);
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
    this.dataService.delete('clients/corporal/' + this.student.id + '/' + evaluation.data).subscribe(
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

}

