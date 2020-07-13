import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dialog-medidas',
  templateUrl: './dialog-medidas.component.html',
  styleUrls: ['./dialog-medidas.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class DialogMedidas {
    ev: any = [];
    question = true;
    msg = '';
    erroAltura = false;
    erroPeso = false;
    erroPunho = false;
    erroJoelho = false;
    erro = false;
    constructor(
      public dialogRef: MatDialogRef<DialogMedidas>,
      @Inject(MAT_DIALOG_DATA) public data,
      private dataService: DataService,
      private datapipe: DatePipe
    ) {
      if (data.newAv && data.daysAv) {
        this.msg += 'A ultima avaliação de altura e peso já tem ' + data.daysAv + ' dias.';
      }
      if (data.newAv && !data.daysAv) {
        this.msg += 'Não existem avaliações de altura e/ou peso. ';
      }
      if (data.newCorporal && data.daysCorporal) {
        this.msg += ' A ultima medição do punho e joelho já tem ' + data.daysCorporal + ' dias.';
      }
      if (data.newCorporal && data.daysCorporal) {
        this.msg += ' Não existem medições de punho e/ou joelho.';
      }
      if (this.msg) {
        this.msg += ' Altere ou adicione novos:';
      }
      this.ev.altura = data.lastAv.altura;
      this.ev.peso = data.lastAv.peso;
      this.ev.punho = data.lastCorporal.punho;
      this.ev.joelho = data.lastCorporal.joelho;
    }

    save() {
      this.erroAltura = false;
      this.erroPeso = false;
      this.erroPunho = false;
      this.erroJoelho = false;
      this.erro = false;
      console.log(this.ev);
      if (!this.ev.altura || +this.ev.altura == 0) {
        this.erroAltura = true;
        this.erro = true;
      }
      if (!this.ev.peso || +this.ev.peso == 0) {
        this.erroPeso = true;
        this.erro = true;
      }
      if (!this.ev.punho || +this.ev.punho == 0) {
        this.erroPunho = true;
        console.log(this.erroPunho);
        this.erro = true;
      }
      if (!this.ev.joelho || +this.ev.joelho == 0) {
        this.erroJoelho = true;
        this.erro = true;
      }

      if (!this.erro) {
        const form: any = {};
        form.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
        form.altura = this.ev.altura;
        form.peso = this.ev.peso;
        form.avaliador = this.dataService.getUserName();
        let sexParam = 0;
        this.data.sexo === 'M' ? sexParam = 5 : sexParam = -161;
        form.tmb = 10 * this.ev.peso + 6.25 * this.ev.altura * 100 - 5 * this.data.idade + sexParam;
        form.imc = this.ev.peso / Math.pow(this.ev.altura, 2);
        this.dataService.setData('clients/eval/' + this.data.id, form).subscribe(
            resp => {
              console.log(resp);
              form.altura = this.ev.altura;
              form.peso = this.ev.peso;
              form.punho = this.ev.punho;
              form.joelho = this.ev.joelho;
              this.dataService.setData('clients/corporal/' + this.data.id, form).subscribe(
                  respc => {
                  console.log(respc);
                  this.dialogRef.close(this.ev);
                  }
              );
            }
        );
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
