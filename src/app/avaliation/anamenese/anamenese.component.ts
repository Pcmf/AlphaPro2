import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anamenese',
  templateUrl: './anamenese.component.html',
  styleUrls: ['./anamenese.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnameneseComponent implements OnInit {
  step: number;
  startDate = new Date();
  student: any = [];
  selectedStudent: any = [];
  dataObj: any;
  dataIniPgm: any;
  dataUltimoExame: any;

  Parentesco: any = [];
  patologiasFamiliar: any = [];
  CardioParentesco: any = [];
  HiperParentesco: any = [];
  DiabetesParentesco: any = [];
  OutraDoencaParentesco: any = [];


  constructor(
    private location: Location,
    private dataService: DataService,
    public dialog: MatDialog,
  ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
  }

  ngOnInit(): void {
    this.dataService.getData('clients/anamnese/' + this.selectedStudent.id).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          this.student = resp[0];
          this.student.profissao = this.selectedStudent.profissao;
          this.student.Q31 == 0 ? this.student.Q31 = false : this.student.Q31 = true;
          this.student.Q32 == 0 ? this.student.Q32 = false : this.student.Q32 = true;
          this.student.Q33 == 0 ? this.student.Q33 = false : this.student.Q33 = true;
          this.student.Q34 == 0 ? this.student.Q34 = false : this.student.Q34 = true;
          this.dataObj = this.student.DT_OBJ;
          this.dataIniPgm = this.student.dt_prevista;
          this.dataUltimoExame = this.student.Q4BDATA;
          this.dataService.getData('patfam/' + this.selectedStudent.id).subscribe(
            respp => {
              this.patologiasFamiliar = respp;
              this.patologiasFamiliar.forEach((el) => {
                if (el.patologia === 'Cardiopatia') {
                  el.maior60 == 0 ? el.maior60 = false : el.maior60 = true;
                  this.CardioParentesco.push(el);
                }
                if (el.patologia === 'Hipertensão') {
                  el.maior60 == 0 ? el.maior60 = false : el.maior60 = true;
                  this.HiperParentesco.push(el);
                }
                if (el.patologia === 'Diabetes') {
                  el.maior60 == 0 ? el.maior60 = false : el.maior60 = true;
                  this.DiabetesParentesco.push(el);
                }
                if (el.patologia === 'OutraDoenca') {
                  el.maior60 == 0 ? el.maior60 = false : el.maior60 = true;
                  this.OutraDoencaParentesco.push(el);
                }
              });
            }
          );
        } else {
          this.student = [];
          this.CardioParentesco = [];
          this.HiperParentesco = [];
          this.DiabetesParentesco = [];
          this.OutraDoencaParentesco = [];
        }
      }
    );
  }


  showCardParent(form, patology) {
    this.CardioParentesco = [];
    form.forEach(element => {
      this.CardioParentesco.push({ parentesco: element, maior60: false, patologia: patology });
    });
  }

  showHiperParent(form, patology) {
    this.HiperParentesco = [];
    form.forEach(element => {
      this.HiperParentesco.push({ parentesco: element, maior60: false, patologia: patology });
    });
  }
  showDiabetesParent(form, patology) {
    this.DiabetesParentesco = [];
    form.forEach(element => {
      this.DiabetesParentesco.push({ parentesco: element, maior60: false, patologia: patology });
    });
  }
  showOutraDoencaParent(form, patology) {
    this.OutraDoencaParentesco = [];
    form.forEach(element => {
      this.OutraDoencaParentesco.push({ parentesco: element, maior60: false, patologia: patology });
    });
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

    if (!form.QEST) {
      form.Q201 = '';
      form.Q13 = '';
    }
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
    if (!this.student.Q31) {
      this.CardioParentesco = [];
      this.dataService.delete('patfam/' + this.selectedStudent.id + '/Cardiopatia').subscribe(
        resd => console.log(resd)
      );
    }
    this.dataService.setData('patfam/' + this.selectedStudent.id, this.CardioParentesco).subscribe(
      res1 => console.log(res1)
    );
    if (!this.student.Q32) {
      this.HiperParentesco = [];
      this.dataService.delete('patfam/' + this.selectedStudent.id + '/Hipertensao').subscribe(
        resd => console.log(resd)
      );
    }
    this.dataService.setData('patfam/' + this.selectedStudent.id, this.HiperParentesco).subscribe(
      res2 => console.log(res2)
    );
    if (!this.student.Q33) {
      this.DiabetesParentesco = [];
      this.dataService.delete('patfam/' + this.selectedStudent.id + '/Diabetes').subscribe(
        resd => console.log(resd)
      );
    }
    this.dataService.setData('patfam/' + this.selectedStudent.id, this.DiabetesParentesco).subscribe(
      res2 => console.log(res2)
    );
    if (!this.student.Q34) {
      this.OutraDoencaParentesco = [];
      this.dataService.delete('patfam/' + this.selectedStudent.id + '/OutraDoenca').subscribe(
        resd => console.log(resd)
      );
    }
    this.dataService.setData('patfam/' + this.selectedStudent.id, this.OutraDoencaParentesco).subscribe(
      res2 => console.log(res2)
    );
    this.saveData(form);
  }

  saveHabitosSociais(form) {
    console.table(form);
    form.Q4BDATA = this.dataUltimoExame;
    this.saveData(form);
  }

  saveQueixasAtuais(form) {
    console.table(form);
    if (!form.Q510) {
      form.Q510TC = '';
      form.Q510TD = '';
      form.Q510TL = '';
    }
    this.saveData(form);
  }

  saveData(form) {
    this.dataService.setData('clients/anamnese/' + this.selectedStudent.id, form).subscribe(
      resp => console.log(resp)
    );
  }

  openDialogHelp(title, info, image): void {
    const dialogRef = this.dialog.open(DialogHelp, {
      width: '250px',
      data: { title, info, image }
    });
  }

}


/* HELP DIALOG  */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-help',
  templateUrl: '../../commun/dialog-help.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogHelp {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogHelp>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

