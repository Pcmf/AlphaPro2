import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-st',
  templateUrl: './st.component.html',
  styleUrls: ['./st.component.scss']
})
export class StComponent implements OnInit {

  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];

  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService
              
            ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.moreData();
        } else {
          this.newEvaluation.dt_avaliacao = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  moreData() {
    const evaluationFinal = this.evaluation.forEach(elem => {
      this.dataService.getData('clients/corporal/' + this.student.id + '/' + elem.data).subscribe(
        (respa: any[]) => {
          if (respa.length > 0) {
            elem.joelho = respa[0].joelho;
            elem.cotovelo = respa[0].cotovelo;
            elem.bracoc = respa[0].bracoc;
          } else {
            elem.idade = 1;
            elem.peso = 1;
            elem.altura = 1;
            elem.imc = 1;
          }
          console.table(elem);
        }
      );
    });
    return evaluationFinal;
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
