import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  locale: string;

  constructor(
              private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.idade = this.ageService.getAge(this.student.dt_nasc);
    this.getData();
  }
  getData() {
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'dd/MM/yyyy'); // this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  calcTMB(ln) {
    let sexParam = 0;
    this.student.sexo == 'M' ? sexParam = 5 : sexParam = -161;
    if (ln.peso > 0 && ln.altura > 0) {
      const TMB = 10 * ln.peso + 6.25 * ln.altura * 100 - 5 * this.student.idade + sexParam;
      return TMB;
    }
    return 0;
  }

  calcIMC(form) {
    const IMC = form.peso / Math.pow(form.altura, 2);
    return IMC;
  }

  ngOnInit(): void {
  }

  save(form) {
    form.tmb = this.calcTMB(form);
   // form.imc = this.calcIMC(form);
    console.table(form);
    this.dataService.setData('clients/eval/' + this.student.id, form).subscribe(
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
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.newEvaluation.avaliador = this.dataService.getUserName();
    if (this.evaluation[this.pointer]) {
      this.newEvaluation.altura = this.evaluation[this.pointer].altura;
      this.newEvaluation.envergadura = this.evaluation[this.pointer].envergadura;
    }
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
