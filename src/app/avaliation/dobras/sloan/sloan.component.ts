import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrepareChartService } from 'src/app/services/prepare-chart.service';

@Component({
  selector: 'app-sloan',
  templateUrl: './sloan.component.html',
  styleUrls: ['./sloan.component.scss']
})
export class SloanComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  sexo: string;

  // graphics
  single: any[];
  single2: any[];
  showChart = false;

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;

  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private protocolos: ProtcolosDobrasService,
              private prepareChart: PrepareChartService
              ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.sexo = this.student.sexo;
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
    /* protocolo Sloan - 12 */
    this.dataService.getData('clients/morfo/12/' + this.student.id).subscribe(
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
    this.dataService.getData('clients/eval/' + this.student.id + '/' + evaluation.data).subscribe(
      (respa: any[]) => {
        if (respa.length) {
          this.dataService.getData('clients/corporal/' + this.student.id).subscribe(
            (respm: any[]) => {
              if (respm.length) {
                const morfo = respm.pop();
                evaluation.altura = respa[0].altura;
                evaluation.peso = respa[0].peso;
                evaluation.punho = morfo.punho;
                evaluation.joelho = morfo.joelho;
                evaluation.sexo = this.student.sexo;
                const proto = this.protocolos.protocoloSloan2d(evaluation, this.gorduraDesejada);
                // Create graphic
                this.showChart = true;
                this.single = this.prepareChart.getSingle1(proto);
                Object.assign(this, this.single);
                // Create graphic 2
                const single2 = this.prepareChart.getSingle2(proto);
                Object.assign(this, { single2 });
              } else {
                this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação!', '');
              }
            }
          );
        } else {
          this.openSnackBar('Atenção: Não existem avaliações complementares para esta data!', '');
          this.showChart = false;
        }
      }
    );

  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 12;
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
}
