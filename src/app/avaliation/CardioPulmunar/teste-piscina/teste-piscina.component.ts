import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste-piscina',
  templateUrl: './teste-piscina.component.html',
  styleUrls: ['./teste-piscina.component.scss']
})
export class TestePiscinaComponent implements OnInit {
  constructor(private location: Location) {
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
