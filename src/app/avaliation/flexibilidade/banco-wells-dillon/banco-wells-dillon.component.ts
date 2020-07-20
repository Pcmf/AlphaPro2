import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';

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
  idade: number;
  protocolo = 38;

  constructor(
              private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private ageService: AgeService,
              private dialogService: DialogService
  ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/flex/' + this.selectedStudent.id + '/' + this.protocolo).subscribe(
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
    form.protocolo = this.protocolo;
    form.xclasse = this.getClass(form);
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

  openDialog(type) {
    this.dialogService.openHelp(type);
  }


  getClass(value) {
    this.idade = this.ageService.getAge(this.selectedStudent.dt_nasc);
    // Female
    if (this.selectedStudent.sexo == 'F') {
      if (this.idade >= 15 && this.idade <= 20) {
        if (value.flex > 43)  {return 'Excelente'; }
        if (value.flex >= 38 && value.flex <= 42)  {return 'Muito Bom'; }
        if (value.flex >= 34 && value.flex <= 37)  {return 'Bom'; }
        if (value.flex >= 29 && value.flex <= 33)  {return 'Regular'; }
        if (value.flex <= 28)  {return 'Fraco'; }
      }
      if (this.idade >= 20 && this.idade <= 29) {
        if (value.flex > 41)  {return 'Excelente'; }
        if (value.flex >= 37 && value.flex <= 40)  {return 'Muito Bom'; }
        if (value.flex >= 33 && value.flex <= 36)  {return 'Bom'; }
        if (value.flex >= 28 && value.flex <= 32)  {return 'Regular'; }
        if (value.flex <= 27)  {return 'Fraco'; }
      }
      if (this.idade >= 30 && this.idade <= 39) {
        if (value.flex > 41)  {return 'Excelente'; }
        if (value.flex >= 36 && value.flex <= 40)  {return 'Muito Bom'; }
        if (value.flex >= 32 && value.flex <= 35)  {return 'Bom'; }
        if (value.flex >= 27 && value.flex <= 31)  {return 'Regular'; }
        if (value.flex <= 26)  {return 'Fraco'; }
      }
      if (this.idade >= 40 && this.idade <= 49) {
        if (value.flex > 38)  {return 'Excelente'; }
        if (value.flex >= 34 && value.flex <= 37)  {return 'Muito Bom'; }
        if (value.flex >= 30 && value.flex <= 33)  {return 'Bom'; }
        if (value.flex >= 25 && value.flex <= 29)  {return 'Regular'; }
        if (value.flex <= 24)  {return 'Fraco'; }
      }
      if (this.idade >= 50 && this.idade <= 59) {
        if (value.flex > 39)  {return 'Excelente'; }
        if (value.flex >= 33 && value.flex <= 38)  {return 'Muito Bom'; }
        if (value.flex >= 30 && value.flex <= 32)  {return 'Bom'; }
        if (value.flex >= 25 && value.flex <= 29)  {return 'Regular'; }
        if (value.flex <= 24)  {return 'Fraco'; }
      }
      if (this.idade >= 60 && this.idade <= 69) {
        if (value.flex > 35)  {return 'Excelente'; }
        if (value.flex >= 31 && value.flex <= 34)  {return 'Muito Bom'; }
        if (value.flex >= 27 && value.flex <= 30)  {return 'Bom'; }
        if (value.flex >= 23 && value.flex <= 26)  {return 'Regular'; }
        if (value.flex <= 22)  {return 'Fraco'; }
      }
    }
    // Male
    if (this.selectedStudent.sexo == 'M') {
      if (this.idade >= 15 && this.idade <= 20) {
        if (value.flex > 39)  {return 'Excelente'; }
        if (value.flex >= 34 && value.flex <= 38)  {return 'Muito Bom'; }
        if (value.flex >= 29 && value.flex <= 33)  {return 'Bom'; }
        if (value.flex >= 24 && value.flex <= 28)  {return 'Regular'; }
        if (value.flex <= 23)  {return 'Fraco'; }
      }
      if (this.idade >= 20 && this.idade <= 29) {
        if (value.flex > 40)  {return 'Excelente'; }
        if (value.flex >= 34 && value.flex <= 39)  {return 'Muito Bom'; }
        if (value.flex >= 30 && value.flex <= 33)  {return 'Bom'; }
        if (value.flex >= 25 && value.flex <= 29)  {return 'Regular'; }
        if (value.flex <= 24)  {return 'Fraco'; }
      }
      if (this.idade >= 30 && this.idade <= 39) {
        if (value.flex > 38)  {return 'Excelente'; }
        if (value.flex >= 33 && value.flex <= 37)  {return 'Muito Bom'; }
        if (value.flex >= 28 && value.flex <= 32)  {return 'Bom'; }
        if (value.flex >= 23 && value.flex <= 27)  {return 'Regular'; }
        if (value.flex <= 22)  {return 'Fraco'; }
      }
      if (this.idade >= 40 && this.idade <= 49) {
        if (value.flex > 35)  {return 'Excelente'; }
        if (value.flex >= 29 && value.flex <= 34)  {return 'Muito Bom'; }
        if (value.flex >= 24 && value.flex <= 28)  {return 'Bom'; }
        if (value.flex >= 18 && value.flex <= 23)  {return 'Regular'; }
        if (value.flex <= 17)  {return 'Fraco'; }
      }
      if (this.idade >= 50 && this.idade <= 59) {
        if (value.flex > 35)  {return 'Excelente'; }
        if (value.flex >= 28 && value.flex <= 34)  {return 'Muito Bom'; }
        if (value.flex >= 24 && value.flex <= 27)  {return 'Bom'; }
        if (value.flex >= 16 && value.flex <= 23)  {return 'Regular'; }
        if (value.flex <= 15)  {return 'Fraco'; }
      }
      if (this.idade >= 60 && this.idade <= 69) {
        if (value.flex > 33)  {return 'Excelente'; }
        if (value.flex >= 25 && value.flex <= 32)  {return 'Muito Bom'; }
        if (value.flex >= 20 && value.flex <= 24)  {return 'Bom'; }
        if (value.flex >= 15 && value.flex <= 19)  {return 'Regular'; }
        if (value.flex <= 14)  {return 'Fraco'; }
      }
    }

  }

}
