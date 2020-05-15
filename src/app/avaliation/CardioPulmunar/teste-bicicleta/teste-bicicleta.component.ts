import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste-bicicleta',
  templateUrl: './teste-bicicleta.component.html',
  styleUrls: ['./teste-bicicleta.component.scss']
})
export class TesteBicicletaComponent implements OnInit {
  constructor(private location: Location) {
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
