import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

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
  id: number;
  student: any = [];

  constructor(private location: Location, private dataService: DataService,
              private actRoute: ActivatedRoute,
              private datapipe: DatePipe ) {
    this.id = this.actRoute.snapshot.params.id;
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }
  getData() {
    this.dataService.getData('clients/eval/' + this.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.dt_avaliacao = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }


  ngOnInit(): void {
  }

  save(form) {
    console.table(form);
    this.dataService.setData('clients/eval/' + this.id, form).subscribe(
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
    this.newEvaluation.dt_avaliacao = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.newEvaluation.avaliador = this.dataService.getUserName();
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
