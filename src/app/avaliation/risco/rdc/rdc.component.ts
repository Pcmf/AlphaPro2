import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-rdc',
  templateUrl: './rdc.component.html',
  styleUrls: ['./rdc.component.scss']
})
export class RDCComponent implements OnInit {

  data: any = [];
  id: number;
  sex: string;
  constructor(private location: Location,
              private dataService: DataService,
              private actRoute: ActivatedRoute,
              private ageService: AgeService,
              private router: Router
              ) {
    this.id = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/rdc/' + this.id).subscribe(
      resp => {
        if (resp[0]) {
          this.data = resp[0];
        }
        // data from cad_aluno
        this.dataService.getData('clients/' + this.id).subscribe(
          respa => {
            this.data.afs = respa[0].afs;
            this.data.qtos = respa[0].qtos;
            this.sex = respa[0].sexo;
            // calculate age
            this.data.idade = this.ageService.getAge(respa[0].dt_nasc);
          }
        );
        // historic cardio family from arq_quest - Q31QTDE
        this.dataService.getData('clients/anamnese/' + this.id).subscribe(
          respq => this.data.hf = respq[0].Q31QTDE
        );
      }
    );
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    console.table(form);
    this.dataService.setData('clients/rdc/' + this.id, form).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['rddc/', this.id]);
      }
    );
  }

}
