import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-banco-wells-dillon',
  templateUrl: './banco-wells-dillon.component.html',
  styleUrls: ['./banco-wells-dillon.component.scss']
})
export class BancoWellsDillonComponent implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  selectedStudent: any = [];
  sex: string;

  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.sex = this.selectedStudent.sexo;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/flex/' + this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          // get data, if exists, from cad_avalia for each flex evaluation - altura e imc
          this.evaluation.forEach(element => {
            this.dataService.getData('clients/eval/' + this.selectedStudent.id + '/' + this.evaluation.data).subscribe(
            respa => {
              if (respa) {
                console.log(respa[0]);
                this.evaluation.altura = respa[0].altura;
                this.evaluation.imc = respa[0].imc;
              }
            }
          );
          });
          console.table(this.evaluation);
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  save(form) {
    console.table(form);
    this.dataService.setData('clients/flex/' + this.selectedStudent.id, form).subscribe(
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
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
