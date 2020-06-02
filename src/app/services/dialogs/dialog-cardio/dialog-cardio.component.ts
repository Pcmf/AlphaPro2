import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMedidas } from '../dialog-medidas.component';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-cardio',
  templateUrl: './dialog-cardio.component.html',
  styleUrls: ['./dialog-cardio.component.scss']
})
export class DialogCardioComponent implements OnInit {
  ev: any = [];
  question = true;
  msg = '';
  erroAltura = false;
  erroPeso = false;
  erroFC2 = false;
  erro = false;
  constructor(
    public dialogRef: MatDialogRef<DialogMedidas>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService,
    private datapipe: DatePipe
  ) {
    if ( data.nafs < 0 ) {
      this.msg += ' O nivél de atividade fisica não foi definido na anamnese. Não será possivél calcular o VO2 estimado.';
    }

    if (data.newAv && data.daysAv) {
      this.msg += ' A ultima avaliação complementar já tem ' + data.daysAv + ' dias.';
    }
    if (data.newAv && !data.daysAv) {
      this.msg += ' Não existem avaliações complementares. ';
    }

    if (this.msg) {
      this.msg += ' Altere ou adicione novos:';
    }
    if (data.lastAv) {
      this.ev.altura = data.lastAv.altura;
      this.ev.peso = data.lastAv.peso;
      this.ev.fc = data.lastAv.fc;
    } else {
      this.ev.altura = '';
      this.ev.peso = '';
      this.ev.fc = '';
    }
  }
  ngOnInit() {}

  save() {
    this.erroAltura = false;
    this.erroPeso = false;
    this.erroFC2 = false;
    this.erro = false;
    if (!this.ev.altura || +this.ev.altura === 0) {
      this.erroAltura = true;
      this.erro = true;
    }

    if (!this.ev.peso || +this.ev.peso === 0) {
      this.erroPeso = true;
      this.erro = true;
    }

    if (!this.ev.fc || +this.ev.fc === 0) {
      this.erroFC2 = true;
      this.erro = true;
    }

    if (!this.erro) {
      const form: any = {};
      form.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
      form.altura = this.ev.altura;
      form.peso = this.ev.peso;
      form.fc = this.ev.fc;  // FC repouso no cad_avalia - fc
      let sexParam = 0;
      this.data.sexo === 'M' ? sexParam = 5 : sexParam = -161;
      form.tmb = 10 * this.ev.peso + 6.25 * this.ev.altura * 100 - 5 * this.data.idade + sexParam;
      form.imc = this.ev.peso / Math.pow(this.ev.altura, 2);
      this.dataService.setData('clients/eval/' + this.data.id, form).subscribe(
          resp => {
            form.altura = this.ev.altura;
            form.peso = this.ev.peso;
            this.dataService.setData('clients/anamnese/' + this.data.id, form).subscribe(
                respc => {
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
