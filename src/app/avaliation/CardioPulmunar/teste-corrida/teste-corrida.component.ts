import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste-corrida',
  templateUrl: './teste-corrida.component.html',
  styleUrls: ['./teste-corrida.component.scss']
})
export class TesteCorridaComponent implements OnInit {
  constructor(private location: Location) {
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
