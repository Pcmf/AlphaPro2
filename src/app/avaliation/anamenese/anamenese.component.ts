import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anamenese',
  templateUrl: './anamenese.component.html',
  styleUrls: ['./anamenese.component.scss']
})
export class AnameneseComponent implements OnInit {
  step: number;
  startDate = new Date();
  student: any = [];
  studentId: number;
  dataObj: any;
  dataIniPgm: any;
  dataUltimoExame: any;

  constructor(private location: Location, private dataService: DataService, private actRoute: ActivatedRoute) {
    this.studentId = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/anamnese/' + this.studentId).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          this.student = resp[0];
          this.dataObj = this.student.DT_OBJ;
          this.dataIniPgm = this.student.dt_prevista;
          this.dataUltimoExame = this.student.Q4BDATA;
        } else {
          this.student = [];
        }
      }
    );
   }


  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  goBack() {
    this.location.back();
  }

  saveObjetivos(form) {
    console.table(form);
    form.DT_OBJ = this.dataObj;
    this.saveData(form);
  }

  saveEstiloVida(form) {
    console.table(form);
    form.dt_prevista = this.dataIniPgm;
    this.saveData(form);
  }

  saveHistoricoPatologico(form) {
    console.table(form);
    this.saveData(form);
  }

  savePatologiaFamiliar(form) {
    console.table(form);
    this.saveData(form);
  }

  saveHabitosSociais(form) {
    console.table(form);
    form.Q4BDATA = this.dataUltimoExame;
    this.saveData(form);
  }

  saveQueixasAtuais(form) {
    console.table(form);
    this.saveData(form);
  }

  saveData(form) {
    this.dataService.setData('clients/anamnese/' + this.studentId, form).subscribe(
      resp => console.log(resp)
    );
  }

}
