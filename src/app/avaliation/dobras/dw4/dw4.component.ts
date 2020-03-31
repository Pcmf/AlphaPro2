import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dw4',
  templateUrl: './dw4.component.html',
  styleUrls: ['./dw4.component.scss']
})
export class DW4Component implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  id: number;
  age: number;
  constructor(private location: Location,
              private dataService: DataService,
              private actRoute: ActivatedRoute,
              private datapipe: DatePipe,
              private menuService: MenuService,
              private ageService: AgeService,
              private snackBar: MatSnackBar
               ) {
    this.id = this.actRoute.snapshot.params.id;
    this.menuService.getSelectedStudent().subscribe(
      (res: any) => {
        this.age = this.ageService.getAge(res.dt_nasc);
        if (res.sexo == 'M' && (this.age < 17 || this.age > 72)) {
          this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
        }
        if (res.sexo == 'F' && (this.age < 16 || this.age > 68)) {
          this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
        }
      }
    );
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/morfo/' + this.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 5;
    this.dataService.setData('clients/morfo/' + this.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }

}
