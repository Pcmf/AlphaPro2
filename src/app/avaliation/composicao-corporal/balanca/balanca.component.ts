import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-balanca',
  templateUrl: './balanca.component.html',
  styleUrls: ['./balanca.component.scss']
})
export class BalancaComponent implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  age: number;
  protocolo = 7;  // Balança

  // graphics
  chartValues: any[];
  view: any[] = [300, 300];

  // options
  gradient = true;
  showLegend = true;
  showLabels = false;
  isDoughnut = false;
  legendPosition = 'bellow';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1010FF', '#BF00FF', '#00FFFF']
  };

  showChart = false;
  chartSelected = 'pie';
  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;
  private newAv: boolean;
  private newCorporal: boolean;
  private lastAv: any = [];
  private lastCorporal: any = [];
  private daysAv = 0;
  private daysCorporal = 0;
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.age = this.ageService.getAge(this.student.dt_nasc);
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
    const chartValues =
     [
       { name: 'Peso: ' + evaluation.peso + ' Kg', value: evaluation.peso },
      { name: '% Gordura: ' + evaluation.perc_gordura_bl + ' %', value: evaluation.perc_gordura_bl },
      { name: 'Massa Gorda: ' + evaluation.massa_gorda + ' Kg', value: evaluation.massa_gorda },
      { name: 'Massa Magra: ' + evaluation.massa_magra + ' Kg', value: evaluation.massa_magra }
     ];

    // Create graphic
    this.showChart = true;
    Object.assign(this, {chartValues});
  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = this.protocolo;
    console.log(this.student.id);

    // Obter a classificação

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

  // Medidas Dialog
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
