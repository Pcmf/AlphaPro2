import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

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
  editPointer: number;
  editAv = false;
  newEvaluation: any = [];
  student: any = [];
  locale: string;
  private tempAltura: number;
  private tempPeso: number;
  private protocolo = 43; // Somatotipo

  constructor(
              private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private dialogService: DialogService
            ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          const tempEvaluation = resp;
          tempEvaluation.forEach(elem => {
            this.dataService.getData('clients/corporal/' + this.student.id + '/' + elem.data).subscribe(
              (respa: any[]) => {
                elem.showEval = false;
                if (respa.length > 0) {
                  elem.joelho = respa[0].joelho;
                  elem.cotovelo = respa[0].cotovelo;
                  elem.bracoc = respa[0].bracoc;
                  elem.pernad = respa[0].pernad;
                  // get morfo data
                  this.dataService.getData('clients/morfo/data/' + this.student.id + '/' + elem.data).subscribe(
                    (respm: any[]) => {
                      if (respm.length > 0) {
                        elem.triciptal = respm[0].triciptal;
                        elem.subescapular = respm[0].subescapular;
                        elem.geminal = respm[0].geminal;
                        elem.suprailiaca = respm[0].suprailiaca;
                        if ( elem.altura > 0 && elem.peso > 0 && elem.joelho > 0 && elem.cotovelo > 0 && elem.triciptal > 0
                            && elem.subescapular > 0 && elem.geminal > 0 && elem.suprailiaca > 0 && elem.bracoc > 0 && elem.pernad > 0 ) {
                              elem.showEval = true;
                          }
                      }
                    }
                  );
                }
              }
            );
          });  // End foreach

          setTimeout(() => {
            const tempEval = [];
            for (const el of tempEvaluation) {
              if (el.showEval) {
                tempEval.push(el);
              }
            }
            this.evaluation = tempEval;
            this.maxPointer = this.evaluation.length;
            this.pointer = this.maxPointer - 1;
      }, 700);

        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  addEvaluation() {
    this.dataService.getLastEvaluation(this.student.id).subscribe(
      (resp: any[]) => {
        if (resp.length > 0) {
          if (resp[0].difdias > 2) {
            this.openSnackBar('Atenção! Esta avaliação já tem ' + resp[0].difdias + ' dias.', '');
          }
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
          this.newEvaluation.altura = resp[0].altura;
          this.newEvaluation.peso = resp[0].peso;
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.addEval = true;
        } else {
          this.openSnackBar('Atenção! Não existe nenhuma avaliação de altura e peso.', '');
        }
      }
    );
  }

  save(form) {
    if (form.peso != this.tempPeso || form.altura != this.tempAltura) {
      // gravar avaliação
      this.dataService.setData('clients/eval/' + this.student.id, form).subscribe(
        resp => {
                  this.newEvaluation = [];
                  this.addEval = false;
                  this.getData();
        }
      );
    }

    form.protocolo = this.protocolo;
    this.dataService.setData('clients/corporal/' + this.student.id, form).subscribe(
      resp0 => {
        this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(
          resp => {
                    this.newEvaluation = [];
                    this.addEval = false;
                    this.getData();
          }
        );
      }
    );
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }


  executeAction(param, evaluation, editPointer) {
    if (param.operation === 'Delete' && param.execute) {
      this.delete(evaluation);
    }
    if (param.operation === 'Edit' && param.execute) {
      this.openEditForm(evaluation, editPointer);
    }
    if (param.operation === 'Edit' && !param.execute) {
      this.closeEditForm();
    }
    if (param.operation === 'Save' && param.execute) {
      this.saveEditForm();
    }
  }

  openEditForm(evaluation, editPointer) {
    this.newEvaluation = evaluation;
    this.editAv = true;
    this.editPointer = editPointer;
  }

  saveEditForm() {
    console.table(this.newEvaluation);
    this.dataService.setData('clients/corporal/' + this.student.id, this.newEvaluation).subscribe(
      resp => {
        console.log(resp);
        this.newEvaluation = [];
        this.closeEditForm();
      }
    );
  }

  closeEditForm() {
    this.editAv = false;
    this.editPointer = -1;
  }

  delete(evaluation) {
    this.dataService.delete('clients/corporal/' + this.student.id + '/' + evaluation.data).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }


  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

    // Help Dialog
    openDialog(type): void {
      this.dialogService.openHelp(type);
    }


  calcIP(evaluation) {
    return (+evaluation.altura * 100 / Math.pow(+evaluation.peso, 1 / 3)).toFixed(2);
  }

  fatorX(evaluation) {
    const IP = +this.calcIP(evaluation);
    let fx = 0;
    if (IP > 40.75) {
      fx = (+evaluation.triciptal + +evaluation.subescapular + +evaluation.suprailiaca) / 10 * 170.18 / +evaluation.altura * 100;
    } else if ( IP > 38.28 && IP <=  40.75) {
      fx = 4 + (+evaluation.cotovelo + +evaluation.joelho + +evaluation.bracoc - +evaluation.triciptal / 10
                + +evaluation.pernad - +evaluation.geminal / 10) / 8;
    } else {
      fx = (+evaluation.altura * 100) / Math.pow(+evaluation.peso, 1 / 3);
    }
    return fx;
  }

  getEndomorfia(evaluation) {
    const somaDobras = +evaluation.triciptal + +evaluation.subescapular + +evaluation.geminal + +evaluation.suprailiaca;
    return +(-0.7182 + 0.1551 * +somaDobras - 0.00068 * Math.pow(+somaDobras, 2) + 0.0000014 * Math.pow(+somaDobras, 3)).toFixed(2);
  }

  getMesomorfia(evaluation) {
    return  +(0.858 * +evaluation.cotovelo + 0.601 * +evaluation.joelho + 0.188 * ( +evaluation.bracoc - +evaluation.triciptal / 10)
             + 0.161 * (+evaluation.pernad - +evaluation.geminal / 10) - 0.131 * (+evaluation.altura * 100) + 4.5).toFixed(2);
  }

  getEctomorfia(evaluation) {
    const ip = (+evaluation.altura * 100) / Math.pow(+evaluation.peso , (1 / 3));
    if (+ip > 40.75) {
      return (+ip * 0.732 - 28.58).toFixed(2);
    }
    if (+ip > 38.28 && +ip <= 40.75) {
      return (+ip * 0.463 - 17.63).toFixed(2);
    }
    return 0.1;
  }

  getX(evaluation) {
    const X =  (+this.getEctomorfia(evaluation) - +this.getEndomorfia(evaluation)).toFixed(1);
    console.log(X);
    return (220 + +X * 10);
  }

  getY(evaluation) {
    const Y =  +(2 * +this.getMesomorfia(evaluation) - +this.getEndomorfia(evaluation) - +this.getEctomorfia(evaluation)).toFixed(1);
    console.log(Y);
    return (240 - +Y * 10);
  }

  getXSm(evaluation) {
    const X =  (+this.getEctomorfia(evaluation) - +this.getEndomorfia(evaluation)).toFixed(1);
    console.log(X);
    return (115 + +X * 5);
  }

  getYSm(evaluation) {
    const Y =  +(2 * +this.getMesomorfia(evaluation) - +this.getEndomorfia(evaluation) - +this.getEctomorfia(evaluation)).toFixed(1);
    console.log(Y);
    return (120 - +Y * 5);
  }

}
