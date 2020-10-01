import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  startDate = new Date(2000, 0, 1);
  date: Date;
  ageError = false;
  student: any = [];
  erroRepeatCliente = false;
  imageB64: string;
  errorData: any = [];

  constructor(private location: Location,
              private dataService: DataService,
              private route: Router,
              private menuService: MenuService,
              private datapipe: DatePipe,
              private ageService: AgeService
  ) {
    this.errorData.year = false;
    this.errorData.month = false;
    this.errorData.day = false;
   }

  ngOnInit(): void {
    if (sessionStorage.selectedStudent) {
          this.student = JSON.parse(sessionStorage.selectedStudent);
          this.student.active === '0' ? this.student.active = false : this.student.active = true;
          this.student.dt_nasc = this.datapipe.transform( this.student.dt_nasc, 'dd/MM/yyyy');
          this.student.lastaccess = this.datapipe.transform( this.student.lastaccess, 'dd/MM/yyyy');
    }
  }
  checkData(data) {
    const dt = new Date();
    if (data.value.substr(-4) < 1920 || data.value.substr(-4) > dt.getFullYear()) {
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
  checkIfExistsClient(form) {
   // const data = this.datapipe.transform( this.student.dt_nasc, 'yyyy-MM-dd');
    const data = this.convertData(form);
    const obj = {nome: form.nome, data};
    this.dataService.setData('clients/check/' + this.dataService.getPTId(), form).subscribe(
      resp => {
        if (resp[0]) {
          this.erroRepeatCliente = true;
        } else {
          this.erroRepeatCliente = false;
        }
      }
    );
  }

  receiveImage(event) {
    console.log(event);
    this.student.foto = event;
  }

  saveForm(form) {
    form.dt_nasc = this.convertData(form.dt_nasc);
    // Verificar se a data de nascimento é válida
    if (this.ageService.getAge(form.dt_nasc) > 99) {
      this.ageError = true;
    } else {
      this.ageError = false;

      if (!this.student.id) {
        // new student
        this.dataService.setData('entity/clients/' + this.dataService.getPTId(), form).subscribe(
          // TODO - control if student was created - important
          resp => {
            this.dataService.getData('clients/' + resp).subscribe(
              res => {
                this.menuService.setSelectedStudent(res[0]);
                sessionStorage.selectedStudent = JSON.stringify(res[0]);
                this.route.navigate(['/eval']);
              }
            );
          }
        );
      } else {
        // edit student
        this.dataService.setData('entity/clients/' + this.dataService.getPTId() + '/' + this.student.id, form).subscribe(
          resp => {
            const aluno = JSON.parse(sessionStorage.selectedStudent);
            aluno.profissao = form.profissao;
            aluno.nome = form.nome;
            aluno.dt_nasc = form.dt_nasc;
            aluno.email = form.email;
            aluno.localidade = form.localidade;
            aluno.morada = form.morada;
            aluno.sexo = form.sexo;
            aluno.telefone = form.telefone;
            aluno.telemovel = form.telemovel;
            aluno.cp = form.cp;
            aluno.active = form.active;
            aluno.foto = form.foto;
            sessionStorage.selectedStudent = JSON.stringify(aluno);
            this.location.back();
          }
        );
      }
    }
  }

  cancel() {
    this.location.back();
  }

  private convertData(data) {
    const ano = data.substr(-4);
    const dia = data.substr(0, 2);
    const mes = data.substr(2, 2);

    return ano + '-' + mes + '-' + dia;
  }

/*  checkDate(data) {
 // console.log(this.ageService.getAge(this.convertData(data)));
  return +this.ageService.getAge(this.convertData(data));

 } */

}
