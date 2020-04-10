import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location,  DatePipe } from '@angular/common';

@Component({
  selector: 'app-jp7',
  templateUrl: './jp7.component.html',
  styleUrls: ['./jp7.component.scss']
})
export class JP7Component implements OnInit {
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
    // start
    this.getData();
  }

  getData() {
    /* Protocolo Jackson Pollok 7d - 4 */
    this.dataService.getData('clients/morfo/4/' + this.selectedStudent.id).subscribe(
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

  save(form) {
    form.protocolo = 4;
    this.dataService.setData('clients/morfo/' + this.selectedStudent.id, form).subscribe(
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
