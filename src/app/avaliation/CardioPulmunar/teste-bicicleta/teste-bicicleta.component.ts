import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teste-bicicleta',
  templateUrl: './teste-bicicleta.component.html',
  styleUrls: ['./teste-bicicleta.component.scss']
})
export class TesteBicicletaComponent implements OnInit {
  studentId: number;
  constructor(private location: Location, private actRoute: ActivatedRoute) {
    this.studentId = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
