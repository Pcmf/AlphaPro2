import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
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
  dataIniPgm: any;
  dataUltimoExame: any;

  doencasList: any = [];
  Parentesco: any = [];
  patologiasFamiliar: any = [];
  CardioParentesco: any = [];
  HiperParentesco: any = [];
  DiabetesParentesco: any = [];
  OutraDoencaParentesco: any = [];

  errorData: any = [];
  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    public dialog: MatDialog
  ) {
    this.errorData.year = false;
    this.errorData.month = false;
    this.errorData.day = false;
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
  }

  ngOnInit(): void {
    this.dataService.getData('clients/anamnese/' + this.selectedStudent.id).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          this.student = resp[0];
          this.student.profissao = this.selectedStudent.profissao;
          this.student.Q2B == 0 ? this.student.Q2B = '0' : this.student.Q2B = '1';
          this.student.Q31 == 0 ? this.student.Q31 = false : this.student.Q31 = true;
          this.student.Q32 == 0 ? this.student.Q32 = false : this.student.Q32 = true;
          this.student.Q33 == 0 ? this.student.Q33 = false : this.student.Q33 = true;
          this.student.Q34 == 0 ? this.student.Q34 = false : this.student.Q34 = true;
          !this.student.Q4D1 || this.student.Q4D1 === '0' ? this.student.Q4D1 = false : this.student.Q4D1 = true;
          !this.student.Q4D2 || this.student.Q4D2 === '0'  ? this.student.Q4D2 = false : this.student.Q4D2 = true;
          !this.student.Q4D3 || this.student.Q4D3 === '0'  ? this.student.Q4D3 = false : this.student.Q4D3 = true;
          this.student.artrite == 0 ? this.student.artrite = false : this.student.artrite = true;
          this.student.bronquite == 0 ? this.student.bronquite = false : this.student.bronquite = true;
          this.student.cancer == 0 ? this.student.cancer = false : this.student.cancer = true;
          this.student.diabetes1 == 0 ? this.student.diabetes1 = false : this.student.diabetes1 = true;
          this.student.diabetes2 == 0 ? this.student.diabetes2 = false : this.student.diabetes2 = true;
          this.student.cardiacas == 0 ? this.student.cardiacas = false : this.student.cardiacas = true;
          this.student.hipertenso == 0 ? this.student.hipertenso = false : this.student.hipertenso = true;
          this.student.osteoporose == 0 ? this.student.osteoporose = false : this.student.osteoporose = true;
          this.student.osteopenia == 0 ? this.student.osteopenia = false : this.student.osteopenia = true;
          this.student.DT_OBJ = this.datapipe.transform( this.student.DT_OBJ, 'dd/MM/yyyy');
          this.dataIniPgm = this.student.dt_prevista;
          this.dataUltimoExame = this.student.Q4BDATA;
          this.checkHipertenso();
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
          this.student.profissao = this.selectedStudent.profissao;
          this.CardioParentesco = [];
          this.HiperParentesco = [];
          this.DiabetesParentesco = [];
          this.OutraDoencaParentesco = [];
          this.checkHipertenso();
        }
      }
    );
  }

  checkData(data) {
    if (data.value.substr(-4) < 2020 ) {
      this.errorData.year = true;
    } else {
      this.errorData.year = false;
    }
    if (data.value.substr(0, 2) > 31 ) {
      this.errorData.day = true;
    } else {
      this.errorData.day = false;
    }
    if (data.value.substr(2, 2) > 12 ) {
      this.errorData.month = true;
    } else {
      this.errorData.month = false;
    }
  }

  private checkHipertenso() {
    this.dataService.getLastEvaluation(this.selectedStudent.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          if (resp[0].tamax >= 140 || resp[0].tamin >= 90) {
            this.student.Q2B = '1';
            this.student.hipertenso = 1;
          }
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
    form.DT_OBJ = this.convertData(form.DT_OBJ);
    console.log(form.DT_OBJ);
    if (!form.QEST) {
      form.Q201 = '';
      form.Q13 = '';
    }
    this.saveData(form);
  }

  private convertData(data) {
    const ano = data.substr(-4);
    const dia = data.substr(0, 2);
    const mes = data.substr(2, 2);

    return ano + '-' + mes + '-' + dia;
  }

  saveEstiloVida(form) {
    form.dt_prevista = this.dataIniPgm;
    this.saveData(form);
  }

  saveHistoricoPatologico(form) {
    console.log(form);
    this.saveData(form);
  }

  clearDoencasInfo(parm) {
    if (parm == 0) {
      this.student.artrite = 0;
      this.student.bronquite = 0;
      this.student.cancer = 0;
      this.student.canceronde = null;
      this.student.diabetes1 = 0;
      this.student.diabetes2 = 0;
      this.student.cardiacas = 0;
      this.student.cardiacasquais = null;
      this.student.hipertenso = 0;
      this.student.osteopenia = 0;
      this.student.osteoporose = 0;
    }
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
    form.Q4D1 ? form.Q4D1 = '1' : form.Q4D1 = '0';
    form.Q4D2 ? form.Q4D2 = '1' : form.Q4D2 = '0';
    form.Q4D3 ? form.Q4D3 = '1' : form.Q4D3 = '0';
    if (form.fumante === 'N') {
      form.qtos = 0;
      form.Q4ATA = 0;
      form.Q4ATA = 0;
    }
    form.Q4BDATA = this.dataUltimoExame;
    this.saveData(form);
  }

  clearBebidaInfo() {
    this.student.qtos = null;
    this.student.Q4BBA = null;
    this.student.Q4BBM = null;
    this.student.Q4BBVEZES = null;
  }

  clearAlimentacaoInfo() {
    this.student.Q4ETIPO = null;
    this.student.Q4EPROF = null;
    this.student.Q4ENOME = null;
    this.student.Q4ECONTATO = null;
  }

  clearFumanteInfo() {
    this.student.qtos = null;
    this.student.Q4ATA = null;
    this.student.Q4ATM = null;
    this.student.Q4APA = null;
    this.student.Q4APM = null;
  }

  saveQueixasAtuais(form) {
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

