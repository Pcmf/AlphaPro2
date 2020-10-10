import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { AgeService } from 'src/app/services/age.service';
@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CCComponent implements OnInit {
  panelOpenState = false;
  dobrasExpanded = false;
  student: any[];
  age: number;
  sex: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private ageService: AgeService
    ) {
      this.dataService.currentAluno.subscribe(
        (resp: any) => {
          this.age = this.ageService.getAge(resp.dt_nasc);
          this.sex = resp.sexo;
        }
      );
      this.dataService.DobrasExpanded.subscribe(
        respd => this.dobrasExpanded = respd
      );

  }

  changeDobrasExpanded() {
    this.dataService.changeDobrasExp(!this.dobrasExpanded);
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}
