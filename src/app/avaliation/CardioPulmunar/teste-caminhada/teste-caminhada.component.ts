import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste-caminhada',
  templateUrl: './teste-caminhada.component.html',
  styleUrls: ['./teste-caminhada.component.scss']
})
export class TesteCaminhadaComponent implements OnInit {
  constructor(private location: Location) {
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
