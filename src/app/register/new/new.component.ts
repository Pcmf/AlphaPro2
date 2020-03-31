import { Component, OnInit } from '@angular/core';
import { Location, formatDate, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: number;
  erroRepeatCliente = false;
  constructor(private location: Location,
              private dataService: DataService,
              private actRoute: ActivatedRoute,
              private route: Router,
              private menuService: MenuService,
              private datapipe: DatePipe) { }

  ngOnInit(): void {
    this.id = +this.actRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.dataService.getData('clients/' + this.id).subscribe(
        resp => {
          this.student = resp[0];
          this.date = this.student.dt_nasc as Date;
        }
      );
    }
  }

  checkIfExistsClient(form) {
    const data = this.datapipe.transform( this.date, 'yyyy-MM-dd');
    const obj = {nome: form.nome, data};
    this.dataService.setData('clients/check/', obj).subscribe(
      resp => {
        if (resp[0]) {
          this.erroRepeatCliente = true;
          console.log(this.erroRepeatCliente);
        } else {
          this.erroRepeatCliente = false;
          console.log(this.erroRepeatCliente);
        }
      }
    );
  }

  saveForm(form) {
    form.dt_nasc = this.datapipe.transform( this.date, 'yyyy-MM-dd');
    console.table(form);
    if (!this.id) {
      // new student
      this.dataService.setData('entity/clients/' + this.dataService.getPTId(), form).subscribe(
        resp => {
          this.dataService.getData('clients/' + resp).subscribe(
            res => {
              this.menuService.setSelectedStudent(res[0]);
              sessionStorage.selectedStudent = JSON.stringify(res[0]);
              this.route.navigate(['/eval/' + resp]);
            }
          );
        }
      );
    } else {
      // edit student
      this.dataService.setData('entity/clients/' + this.dataService.getPTId() + '/' + this.id, form).subscribe(
        resp => {
          console.log(resp);
          this.location.back();
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }



}
