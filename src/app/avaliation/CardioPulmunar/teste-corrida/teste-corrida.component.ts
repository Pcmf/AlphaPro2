import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teste-corrida',
  templateUrl: './teste-corrida.component.html',
  styleUrls: ['./teste-corrida.component.scss']
})
export class TesteCorridaComponent implements OnInit {
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
