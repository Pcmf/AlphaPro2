import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-im',
  templateUrl: './im.component.html',
  styleUrls: ['./im.component.scss']
})
export class IMComponent implements OnInit {

  evaluation: any = [];
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];

  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe ) {
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
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }



  ngOnInit(): void {
  }

/*   save(form) {
    console.table(form);
    this.dataService.setData('clients/eval/' + this.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  } */

  goBack() {
    this.location.back();
  }

/*   addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.newEvaluation.avaliador = this.dataService.getUserName();
    if (this.evaluation[this.pointer].altura) {
      this.newEvaluation.altura = this.evaluation[this.pointer].altura;
    }
    this.addEval = true;
  } */
/* 
  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  } */

}
