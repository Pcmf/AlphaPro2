import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';
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
    private dialogService: DialogService,
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
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/cardio/' + this.protocolo + '/' + this.student.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.paramEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    if (this.selectedEvaluation && this.selectedEvaluation.data === this.datapipe.transform(Date(), 'yyyy-MM-dd')) {
      this.newEvaluation = this.selectedEvaluation;
    }
    this.newEvaluation.sexo = this.student.sexo;
    this.newEvaluation.idade = this.ageService.getAge(this.student.dt_nasc);
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }


  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  

}
