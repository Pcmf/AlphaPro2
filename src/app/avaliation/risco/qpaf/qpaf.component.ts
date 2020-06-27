import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qpaf',
  templateUrl: './qpaf.component.html',
  styleUrls: ['./qpaf.component.scss']
})
export class QPAFComponent implements OnInit, OnDestroy {
  student: any = [];
  id: number;
  formS: any = [];
  constructor(private location: Location,
              private dataService: DataService,
              private router: Router
              ) {
    this.id = JSON.parse(sessionStorage.selectedStudent).id;
    this.dataService.getData('clients/parq/' + this.id).subscribe(
      resp => {
        if (resp[0]) {
          this.student = resp[0];
        } else {
          this.student.codigo = this.id;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.dataService.setData('clients/parq/' + this.id, this.formS).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    this.formS = form;
    this.router.navigate(['/rdc']);
  }

  calcRisco(form) {
    this.formS = form;
  }

}
