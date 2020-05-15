import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste-banco',
  templateUrl: './teste-banco.component.html',
  styleUrls: ['./teste-banco.component.scss']
})
export class TesteBancoComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }

}
