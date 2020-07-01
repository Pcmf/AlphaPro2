import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  startDate = new Date(2000, 0, 1);
  date: Date;
  student: any = [];
  erroRepeatCliente = false;

  constructor(private location: Location,
              private dataService: DataService,
              private route: Router,
              private menuService: MenuService,
              private datapipe: DatePipe) { }

  ngOnInit(): void {
    if (sessionStorage.selectedStudent) {
          this.student = JSON.parse(sessionStorage.selectedStudent);
          this.student.active === '0' ? this.student.active = false : this.student.active = true;
          this.student.dt_nasc = this.datapipe.transform( this.student.dt_nasc, 'dd/MM/yyyy');
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

  saveForm(form) {
    form.dt_nasc = this.convertData(form);
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
          sessionStorage.selectedStudent = JSON.stringify(aluno);
          this.location.back();
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }

  private convertData(form) {
    const ano = form.dt_nasc.substr(-4);
    const dia = form.dt_nasc.substr(0, 2);
    const mes = form.dt_nasc.substr(2, 2);

    const data = ano + '-' + mes + '-' + dia;
    return data;
  }

}
