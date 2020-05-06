import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-rockport',
  templateUrl: './rockport.component.html',
  styleUrls: ['./rockport.component.scss']
})
export class RockportComponent implements OnInit {
  evaluation: any = [];
  paramEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  id: number;
  selectedStudent: any = [];
  sex: string;
  protocolo = 20;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe
             ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.sex = this.selectedStudent.sexo;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.paramEvaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer]);
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
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

  save(form) {
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/cardio/' + this.selectedStudent.id, form).subscribe(
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
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
