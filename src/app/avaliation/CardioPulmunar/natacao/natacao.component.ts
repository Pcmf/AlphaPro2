import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtocolosCardioService } from 'src/app/services/protocolos-cardio.service';

@Component({
  selector: 'app-natacao',
  templateUrl: './natacao.component.html',
  styleUrls: ['./natacao.component.scss']
})
export class NatacaoComponent implements OnInit {
  // All evaluations loaded from db
  evaluation: any = [];
  // evaluations to push to charts
  paramEvaluation: any = [];
  // student phisical condition
  nafs = 0;  // not defined - it will be necessair ask for it in dialogs

  addEval = false;
  pointer = -1;
  maxPointer = -1;
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  student: any = [];
  protocolo = 35;
  newAv: boolean;
  daysAv: any;
  lastAv: any;
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private ageService: AgeService,
    private snackBar: MatSnackBar,
    private protocoloCardio: ProtocolosCardioService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer]);
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
          this.maxPointer = -1;
        }
      }
    );
  }

  // Seleciona a data que está a mostrar
  setEvaluation(evaluation) {
    this.selectedEvaluation = evaluation;
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
  }

  ngOnInit(): void {
  }

  getClassificacao(evaluation) {
    evaluation.sexo = this.student.sexo;
    evaluation.idade = this.ageService.getAge(this.student.dt_nasc);
    return this.protocoloCardio.getClasseNatacao(evaluation);
  }

  save(form) {
    if (form.data) {
      form.protocolo = this.protocolo;
      this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, form).subscribe(
        resp => {
          this.newEvaluation = [];
          this.paramEvaluation = [];
          this.addEval = false;
          this.getData();
        }
      );
    } else {
      this.openSnackBar('Atenção! Tem que definir uma data para esta avaliação!', '');
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
    this.getLastEvaluation();
    this.editAv = true;
    this.editPointer = editPointer;
  }

  saveEditForm() {
    this.newEvaluation.protocolo = this.protocolo;
    console.table(this.newEvaluation);
    this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        console.log(resp);
        this.newEvaluation = [];
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
    this.dataService.delete('clients/cardio/' + this.protocolo + '/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
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
    this.newEvaluation.sexo = this.student.sexo;
    this.newEvaluation.idade = this.ageService.getAge(this.student.dt_nasc);

    this.addEval = true;
  }


  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  // Obter a ultima avaliação para a edição
  getLastEvaluation() {
    // Obter dados da anamnese com o nivel de atividade do aluno
    this.dataService.getData('clients/anamnese/' + this.student.id).subscribe(
      (respa: any[]) => {
        if (respa && respa.length > 0) {
          if (respa[0].nafs >= 0) {
            this.newEvaluation.nafs = respa[0].nafs;
          }
        }
        // Obter os dados da ultima Avaliação complementar
        this.dataService.getLastEvaluation(this.student.id).subscribe(
          (resp: any[]) => {
            if (resp.length > 0) {

              this.newEvaluation.altura = resp[0].altura;
              this.newEvaluation.peso = resp[0].peso;
              this.newEvaluation.fc2 = resp[0].fc;
            }
            this.newEvaluation.sexo = this.student.sexo;
            this.newEvaluation.idade = this.ageService.getAge(this.student.dt_nasc);
          }
        );
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

}
