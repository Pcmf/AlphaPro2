import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header-name',
  templateUrl: './header-name.component.html',
  styleUrls: ['./header-name.component.scss']
})
export class HeaderNameComponent implements OnInit {

  studentName: string;

  constructor(
    private dataService: DataService,
  ) {

   }

  ngOnInit(): void {
          this.dataService.currentAluno.subscribe(
        (resp: any) => {
          this.studentName = resp.nome;
          if (!this.studentName && sessionStorage.selectedStudent) {
            this.dataService.changeAluno(JSON.parse(sessionStorage.selectedStudent));
          }
        }
      );
  }

}
