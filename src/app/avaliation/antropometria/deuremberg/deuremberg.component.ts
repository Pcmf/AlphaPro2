import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-deuremberg',
  templateUrl: './deuremberg.component.html',
  styleUrls: ['./deuremberg.component.scss']
})
export class DeurembergComponent implements OnInit {
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
              private datapipe: DatePipe) {
    this.id = this.actRoute.snapshot.params.id;
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.sex = this.selectedStudent.sexo;
    this.getData();
  }

  getData() {
    this.dataService.getData(`clients/morfo/medidas/${this.id}`).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }

        this.dataService.getData(`clients/${this.id}`).subscribe(
          respa => {
            this.evaluation.forEach(element => {
              element.imc = respa[0].imc;
              element.altura = respa[0].altura;
              const timeDiff = Math.abs(Date.now() - new Date(respa[0].dt_nasc).getTime());
              element.idade = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            });
          }
        );
      }
    );
  }


  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 9;
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
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

}
