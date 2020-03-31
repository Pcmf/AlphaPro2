import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pre-dash',
  templateUrl: './pre-dash.component.html',
  styleUrls: ['./pre-dash.component.scss']
})
export class PreDashComponent implements OnInit {
  panelOpenState = false;
  selectedStudent: any = [];

  constructor(private dataService: DataService, private actRoute: ActivatedRoute) {
    const studentId = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/entity/' + this.dataService.getPTId() + '/' + studentId).subscribe(
      resp => {
        this.selectedStudent = resp[0];
      }
    );
  }

  ngOnInit(): void {
  }

}
