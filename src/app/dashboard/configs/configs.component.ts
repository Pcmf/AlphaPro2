import { Component, OnInit } from '@angular/core';
import countries from './countries.json';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {
  user: any = [];
  countries: any;
  country: any = [];
  constructor(
    private dataService: DataService
  ) {
    this.countries = countries;
  }

  ngOnInit(): void {
    this.dataService.getData('entities/' + this.dataService.getPTId()).subscribe(
      resp => {
        this.user = resp[0];
        this.user.password = '';
        this.user.confirm = '';
        console.log(resp);
      }
    );
  }

  savePersonalData(form) {
    this.dataService.setData('entities/' + this.dataService.getPTId(), form).subscribe(
      resp => {
        console.log(resp);
        if (!resp) {
          alert('Dados alterados com sucesso!');
        }
      }
    );
  }

  saveAcessData(form) {
    this.dataService.setData('entities/' + this.dataService.getPTId(), form).subscribe(
      resp => {
        console.log(resp);
        if (!resp) {
          this.user.password = '';
          this.user.confirm = '';
          alert('Dados de acesso alterados com sucesso!');
        }
      }
    );
  }

}
