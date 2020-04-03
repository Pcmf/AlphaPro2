import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rddc',
  templateUrl: './rddc.component.html',
  styleUrls: ['./rddc.component.scss']
})
export class RDDCComponent implements OnInit {

  age: number;
  data: any = [];
  points = 0;
  smoker = '0';
  id: number;

  constructor(private location: Location, private dataService: DataService, private actRoute: ActivatedRoute) {
      this.id = this.actRoute.snapshot.params.id;
      this.dataService.getData('clients/' + this.id).subscribe(
        resp => {
          if (resp[0].fumante == 'S' || resp[0].fumante == 'E') {
            this.smoker = '1';
            this.points += 1;
          }
          const timeDiff = Math.abs(Date.now() - new Date(resp[0].dt_nasc).getTime());
          this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
          if (this.age < 30 ) {
            this.points += 0;
          } else if (this.age < 40) {
            this.points += 1;
          } else if (this.age < 65) {
            this.points += 2;
          } else {
            this.points += 3;
          }
          this.dataService.getData('clients/column/' + this.id).subscribe(
            respd => {
              if (respd[0]) {
                this.data = respd[0];
              }
              this.data.smoker = this.smoker;
            }
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
    form.pontos = +this.points + +form.objetos + +form.alonga + +form.peso + +form.dor;
    this.dataService.setData('clients/column/' + this.id, form).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

}
