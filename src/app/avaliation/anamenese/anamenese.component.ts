import { Component, OnInit, Inject } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anamenese',
  templateUrl: './anamenese.component.html',
  styleUrls: ['./anamenese.component.scss']
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
  CardioParentesco: any = [];
  HiperParentesco: any = [];


  constructor(private location: Location,
              private dataService: DataService,
              private dialog: MatDialog
              ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.dataService.getData('clients/anamnese/' + this.selectedStudent.id).subscribe(
      (resp: any) => {
        if (resp.length > 0) {
          this.student = resp[0];
          this.student.profissao = this.selectedStudent.profissao;
          this.dataObj = this.student.DT_OBJ;
          this.dataIniPgm = this.student.dt_prevista;
          this.dataUltimoExame = this.student.Q4BDATA;
        } else {
          this.student = [];

        }
        this.CardioParentesco = [{parentesco: 'Pai', mais60: '1', patologia: 'Cardipatia'},
        {parentesco: 'Mãe', mais60: false, patologia: 'Cardipatia'}];
      }
    );
   }

   showCardParent(form, patology) {
     console.log(form);
     this.CardioParentesco = [];
     form.forEach(element => {
       this.CardioParentesco.push({parentesco: element, mais60: false, patologia: patology});
     });
     console.log(this.CardioParentesco);
   }
   showHiperParent(form, patology) {
    console.log(form);
    this.HiperParentesco = [];
    form.forEach(element => {
      this.HiperParentesco.push({parentesco: element, mais60: false, patologia: patology});
    });
    console.log(this.HiperParentesco);
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

