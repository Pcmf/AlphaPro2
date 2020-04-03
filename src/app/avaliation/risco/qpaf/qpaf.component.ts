import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qpaf',
  templateUrl: './qpaf.component.html',
  styleUrls: ['./qpaf.component.scss']
})
export class QPAFComponent implements OnInit {
  student: any = [];
  id: number;
  constructor(private location: Location, private dataService: DataService, private actRoute: ActivatedRoute) {
    this.id = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/parq/' + this.id).subscribe(
      resp => {
        if (resp[0]) {
          this.student = resp[0];
        } else {
          this.student.codigo = this.id;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    this.dataService.setData('clients/parq/' + this.id, form).subscribe(
      resp => {
        console.log(resp);
        this.location.back();
      }
    );
  }

}
