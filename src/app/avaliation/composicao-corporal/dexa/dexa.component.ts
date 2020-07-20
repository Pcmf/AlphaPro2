import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dexa',
  templateUrl: './dexa.component.html',
  styleUrls: ['./dexa.component.scss']
})
export class DEXAComponent implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  locale: string;
  lastAv: any;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    //
    this.getData();
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
  }


  getData() {
    this.dataService.getData('clients/dexa/' + this.student.id).subscribe(
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

  ngOnInit(): void {
  }

  save(form) {
    console.log(this.student.id);
    this.dataService.setData('clients/dexa/' + this.student.id, form).subscribe(
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
        if (resp.length > 0) {
          // tslint:disable-next-line: no-conditional-assignment
          this.lastAv = resp.pop();
        } else {
          this.lastAv = 0;
        }
        this.newEvaluation.altura = this.lastAv.altura;
        this.newEvaluation.peso = this.lastAv.peso;
      }
    );
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  getTotal(evaluation) {
    return 0;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  // Help Dialog
  openDialog(type): void {
    this.dialogService.openHelp(type);
  }

}
