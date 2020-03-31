import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teste-caminhada',
  templateUrl: './teste-caminhada.component.html',
  styleUrls: ['./teste-caminhada.component.scss']
})
export class TesteCaminhadaComponent implements OnInit {
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
