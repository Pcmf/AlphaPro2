import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LastEvaluationService } from 'src/app/services/last-evaluation.service';

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
  spinner = false;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private protocolos: ProtcolosDobrasService,
    private prepareChart: PrepareChartService,
    public dialogService: DialogService,
    private lastEvalService: LastEvaluationService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.age = this.ageService.getAge(this.student.dt_nasc);
    this.sex = this.student.sexo;
    if ((this.sex === 'M' && (this.age < 22 || this.age > 78)) || (this.sex === 'F' && (this.age < 15 || this.age > 79))) {
      this.openSnackBar('Atenção! Este protocolo não é adequado para este aluno(a).', '');
    }
    this.getData();
  }

  // Protocolo Tran & Weltman - 14
  getData() {
    this.spinner = true;
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
          this.maxPointer = -1;
          this.showChart = false;
        }
        this.spinner = false;
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
    this.spinner = true;
    this.dataService.setData('entity/clients/' + this.student.entity + '/' + this.student.id, this.student).subscribe(
      resp => {
        this.spinner = false;
        this.getData();
      }
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
    if (form.data) {
      form.protocolo = 14;
      this.spinner = true;
      this.dataService.setData('clients/corporal/' + this.student.id, form).subscribe(
        resp => {
          this.newEvaluation = [];
          this.addEval = false;
          this.spinner = false;
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

  addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    // if already have an evaluation on actual date
    if (this.maxPointer != -1 && this.evaluation[this.maxPointer - 1].data == this.newEvaluation.data) {
      this.newEvaluation.data = '';
      this.newEvaluation = [];
    }
    // Obter dados das avaliações complementares e ultima corporal
    this.lastEvalService.getLastEvaluation(this.student, this.newEvaluation.data);
    this.lastEvalService.lastEval.subscribe(
      (resp: any) => {
        if (resp.erro != undefined && !resp.erro) {
          this.newEvaluation.altura = resp.altura;
          this.newEvaluation.peso = resp.peso;
          this.newEvaluation.punho = resp.punho;
          this.newEvaluation.joelho = resp.joelho;

          // Obter dados da corporal se existir com a mesma data
          this.dataService.getData('clients/corporal/' + this.student.id + '/' + this.newEvaluation.data).subscribe(
            (respc: any ) => {
                console.log(respc);
                if (respc.length > 0 ) {
                  respc[0].abdomen2 > 0 ? this.newEvaluation.abdomen2 = respc[0].abdomen2 : this.newEvaluation.abdomen2 = '';
                  respc[0].abdomen > 0 ? this.newEvaluation.abdomen = respc[0].abdomen : this.newEvaluation.abdomen = '';
                  respc[0].quadril > 0 ? this.newEvaluation.quadril = respc[0].quadril : this.newEvaluation.quadril = '';
                  respc[0].cintura > 0 ? this.newEvaluation.cintura = respc[0].cintura : this.newEvaluation.cintura = '';
                }
            }
          );
          this.addEval = true;
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
    this.spinner = true;
    this.dataService.setData('clients/corporal/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        this.startGraphics(this.newEvaluation);
        this.newEvaluation = [];
        this.spinner = false;
        this.closeEditForm();
        this.getData();
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
        this.startGraphics([]);
        this.getData();
      }
    );
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
    this.getData();
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

