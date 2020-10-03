import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-teste-corrida',
  templateUrl: './teste-corrida.component.html',
  styleUrls: ['./teste-corrida.component.scss']
})
export class TesteCorridaComponent implements OnInit {
  age: number;
  constructor(
      private location: Location,
      private ageService: AgeService
    ) {
    this.age = this.ageService.getAge(JSON.parse(sessionStorage.selectedStudent).dt_nasc);
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
