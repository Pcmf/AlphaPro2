import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgeService } from 'src/app/services/age.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-all-dobras',
  templateUrl: './all-dobras.component.html',
  styleUrls: ['./all-dobras.component.scss']
})
export class AllDobrasComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  sex: string;
  age: number;
  protocolo = 8;
  // graphics
  single: any[];
  single2: any[];
  showChart = false;
  locale: string;

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.
  fatChanged = false;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              public dialogService: DialogService,
              private ageService: AgeService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.student.percgd > 0 ? this.gorduraDesejada = this.student.percgd : this.student.percgd = this.gorduraDesejada;
    this.sex = this.student.sexo;
    this.age = this.ageService.getAge(this.student.dt_nasc);
    // start
    this.getData();
  }

  getNewEvaluation() {
    this.setEvaluation(this.selectedEvaluation);
    this.fatChanged = true;
  }

  getData() {
    /* Protocolo Soma todas as dobras */
    this.dataService.getData('clients/morfo/' + this.protocolo + '/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer]);
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

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = this.protocolo;
    this.saveToDB(form);

    /* Durnim & Womersley - 4 dobras  - protocolo 5 */
    if (form.triciptal > 0 && form.subescapular > 0 && form.biciptal > 0 && form.suprailiaca > 0) {
      form.protocolo = 5;
      this.saveToDB(form);
    }
    /* Faulkner - 4 dobras  - protocolo 2 */
    if (form.triciptal > 0 && form.subescapular > 0 && form.abdominal > 0 && form.suprailiaca > 0
          &&  this.student.sexo == 'F') {
      form.protocolo = 2;
      this.saveToDB(form);
    }
    /* Guedes - 3 dobras  - protocolo 1 */
    if (form.triciptal > 0  && form.abdominal > 0 && form.suprailiaca > 0) {
      form.protocolo = 1;
      this.saveToDB(form);
    }
    /* JP3 - 3 dobras  - protocolo 3 */
    if ((this.student.sexo == 'M' && form.peitoral > 0  && form.abdominal > 0)
        || (this.student.sexo == 'F' && form.triciptal  > 0 && form.suprailiaca > 0) && form.crural > 0) {
      form.protocolo = 3;
      this.saveToDB(form);
    }
    /* JP7 - 7 dobras  - protocolo 4 */
    if (form.triciptal > 0 && form.subescapular > 0 && form.peitoral > 0 && form.suprailiaca > 0
      && form.axilar > 0 && form.abdominal > 0 && form.crural > 0) {
      form.protocolo = 4;
      this.saveToDB(form);
    }
    /* Petroski - 4 dobras  - protocolo 10 */
    if ((this.student.sexo == 'M' && form.triciptal > 0 && form.subescapular > 0)
        || (this.student.sexo == 'F' && form.axilar > 0 && form.crural > 0) && form.geminal > 0 && form.suprailiaca > 0) {
      form.protocolo = 10;
      this.saveToDB(form);
    }
    /* Slaugther - 2 dobras  - protocolo 6 */
    if (form.triciptal > 0 && form.geminal > 0) {
      form.protocolo = 6;
      this.saveToDB(form);
    }
    /* Sloan - 2 dobras  - protocolo 12 */
    if ((this.student.sexo == 'M' && form.crural > 0 && form.subescapular > 0)
        || (this.student.sexo == 'F' && form.triciptal > 0 && form.suprailiaca > 0)) {
      form.protocolo = 12;
      this.saveToDB(form);
    }
        /* Williams - 4 dobras  - protocolo 11 */
    if (form.triciptal > 0 && form.subescapular > 0 && form.geminal > 0 && form.abdominal > 0) {
      form.protocolo = 11;
      this.saveToDB(form);
    }
    /* Wilmore & Benk - 2 dobras  - protocolo 16 */
    if (this.student.sexo == 'M' && form.crural > 0 && form.abdominal > 0) {
      form.protocolo = 16;
      this.saveToDB(form);
    }
    /* Wilmore & Benk - Mulheres - 3 dobras  - protocolo 15 */
    if (this.student.sexo == 'F' && form.crural > 0 && form.subescapular > 0 && form.triciptal > 0) {
      form.protocolo = 15;
      this.saveToDB(form);
    }
    this.newEvaluation = [];
    this.addEval = false;
    this.getData();
  }

  // Save to DB
  saveToDB(form) {
    this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe( resp => {});
    return;
  }


  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.dataService.getLastEvaluation(this.student.id).subscribe(
      resp => {
        if (resp) {
          if (resp[0].difdias > 2) {
            this.openSnackBar('Atenção! Esta avaliação já tem ' + resp[0].difdias + ' dias.', '');
          }
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          console.log(this.newEvaluation);
          this.addEval = true;
        } else {
          this.openSnackBar('Atenção! Não existe nenhuma avaliação de altura e peso.', '');
        }
      }
    );
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

    // Help Dialog
    openDialog(type): void {
      this.dialogService.openHelp(type);
    }

}
