import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-will',
  templateUrl: './will.component.html',
  styleUrls: ['./will.component.scss']
})
export class WillComponent implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  id: number;
  selectedStudent: any = [];
  sex: string;

  constructor(private location: Location, private dataService: DataService,
              private actRoute: ActivatedRoute,
              private datapipe: DatePipe ) {
    this.id = this.actRoute.snapshot.params.id;
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.sex = this.selectedStudent.sexo;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/morfo/' + this.id).subscribe(
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
    form.protocolo = 11;
    this.dataService.setData('clients/morfo/' + this.id, form).subscribe(
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
