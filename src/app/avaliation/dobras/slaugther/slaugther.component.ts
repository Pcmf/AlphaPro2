import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgeService } from 'src/app/services/age.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-slaugther',
  templateUrl: './slaugther.component.html',
  styleUrls: ['./slaugther.component.scss']
})
export class SlaugtherComponent implements OnInit {
  evaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  id: number;

  // graphics
  single: any[];
  view: any[] = [300, 300];

  // options
  gradient = true;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private location: Location, private dataService: DataService,
              private actRoute: ActivatedRoute,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private ageService: AgeService
  ) {

    this.id = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/' + this.id).subscribe(
      resp => {
        this.student = resp[0];
        const age = this.ageService.getAge(resp[0].dt_nasc);
        if (age > 16) {
          this.openSnackBar('Atenção: Este protocolo não deve ser usado neste aluno!', '');
        }

      }
    );
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/morfo/' + this.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          const single = [{ name: 'Triciptal', value: this.evaluation[this.pointer].triciptal },
                          { name: 'Geminal', value: this.evaluation[this.pointer].geminal }];
          Object.assign(this, { single });
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

  save(form) {
    form.protocolo = 6;
    this.dataService.setData('clients/morfo/' + this.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addEval = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addEvaluation() {
    this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
    this.addEval = true;
  }

  closeInput() {
    this.newEvaluation = [];
    this.addEval = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, verticalPosition: 'top'
    });
  }
}
