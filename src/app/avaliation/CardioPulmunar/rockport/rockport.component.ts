import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-rockport',
  templateUrl: './rockport.component.html',
  styleUrls: ['./rockport.component.scss']
})
export class RockportComponent implements OnInit {
  // All evaluations loaded from db
  evaluation: any = [];
  // evaluations to push to charts
  paramEvaluation: any = [];
  // student phisical condition
  classe: number;

  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  selectedEvaluation: any = [];
  selectedStudent: any = [];
  protocolo = 20;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService
  ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.dataService.getData('clients/anamnese/' + this.selectedStudent.id).subscribe(
            respa => {
              this.maxPointer = resp.length;
              this.evaluation = resp;
              this.pointer = this.maxPointer - 1;
              if (respa) {
                this.classe = respa[0].classe;
              } else {
                alert('Faltam dados para o calculo do VO2 Estimado');
              }
              resp.map((ln) => {
                this.dataService.getData('clients/eval/' + this.selectedStudent.id + '/' + ln.data).subscribe(
                  (respe: any[]) => {
                    if (respe && respe.length > 0) {
                      ln.peso = respe[0].peso;
                      ln.altura = respe[0].altura;
                      ln.idade = this.ageService.getAgeFromDate1(ln.data, this.selectedStudent.dt_nasc);
                      ln.sexo = this.selectedStudent.sexo;
                      return ln;
                    }
                  }
                );
              });
              setTimeout(() => {
                this.paramEvaluation = resp;
              }, 700);

              this.setEvaluation(this.evaluation[this.pointer]);
            }
          );
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
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
