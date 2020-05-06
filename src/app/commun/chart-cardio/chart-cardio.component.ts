import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-cardio',
  templateUrl: './chart-cardio.component.html',
  styleUrls: ['./chart-cardio.component.scss']
})
export class ChartCardioComponent implements OnInit {

  @Input() id: number;
  @Input() protocolo: number;

  multi: any[];
  view: any[] = [360, 340];

  // options
  legend = true;
  legendPosition = 'below';
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tempo (minutos)';
  yAxisLabel = 'Freq. Cardiaca (bpm)';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#3333FF', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    const multi = [];
    this.dataService.getData('clients/cardio/' + this.protocolo + '/' + this.id).subscribe(
      (resp: any[]) => {
        // Caminhada Rockport
        if (this.protocolo === 20) {
          resp.forEach((ln) => {
            multi.push({
              name: ln.data,
              series: [
                {
                  name: 0,
                  value: ln.min0
                },
                {
                  name: 2,
                  value: ln.min2
                },
                {
                  name: 4,
                  value: ln.min4
                },
                {
                  name: 6,
                  value: ln.min6
                },
                {
                  name: 8,
                  value: ln.min8
                },
                {
                  name: 10,
                  value: ln.min10
                },
                {
                  name: 12,
                  value: ln.min12
                },
                {
                  name: 14,
                  value: ln.min14
                },
                {
                  name: 16,
                  value: ln.min16
                },
                {
                  name: 18,
                  value: ln.min18
                },
                {
                  name: 20,
                  value: ln.min20
                },
                {
                  name: 'Final',
                  value: ln.fc
                }
              ]
            });
          });
        }
        // Corrida Cooper
        if (this.protocolo === 25) {
          console.log('Cooper ref');
          resp.forEach((ln) => {
            multi.push({
              name: ln.data,
              series: [
                {
                  name: 0,
                  value: ln.min0
                },
                {
                  name: 2,
                  value: ln.min2
                },
                {
                  name: 4,
                  value: ln.min4
                },
                {
                  name: 6,
                  value: ln.min6
                },
                {
                  name: 8,
                  value: ln.min8
                },
                {
                  name: 10,
                  value: ln.min10
                },
                {
                  name: 'Final',
                  value: ln.fc
                }
              ]
            });
          });
        }

        Object.assign(this, { multi });
      }
    );

  }

}
