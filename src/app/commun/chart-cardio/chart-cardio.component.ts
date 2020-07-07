import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProtocolosCardioService } from 'src/app/services/protocolos-cardio.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart-cardio',
  templateUrl: './chart-cardio.component.html',
  styleUrls: ['./chart-cardio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardioComponent implements OnInit {

  @Input() protocolo: number;
  @Input() evaluation: Observable<any>;

  multi: any[];
  multi2: any[];
  view: any[] = [340, 310];
  view2: any[] = [340, 230];

  // options - FC line chart
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

  // options  - VO2 - bar chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel2 = true;
  xAxisLabel2 = 'VO2 Máximo';
  showYAxisLabel2 = true;
  yAxisLabel1 = 'ml/Kg/min';
  legendTitle = '';
  barPadding = 0;
  groupPadding = 5;

  private dados: any = [];
  result: any = [];
  ready: boolean;

  showLineChart = true;
  locale: string;

  constructor(
    private protocolosCardio: ProtocolosCardioService,
    private dataService: DataService
  ) {
    this.locale = this.dataService.getCountryId();
   }

  ngOnInit(): void {
    // FC charts
    let multi = [];
    this.evaluation.forEach(
      (ln) => {
        // Caminhada Rockport
        if (this.protocolo === 20) {
          multi = [...multi, {
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
          }];
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Caminhada UKK
        if (this.protocolo === 21) {
          this.showLineChart = false;
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Corrida submaxima George et al 1609 metros
        if (this.protocolo === 26) {
          this.showLineChart = false;
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Corrida esteira George et al 3 minutos
        if (this.protocolo === 23) {
          this.showLineChart = false;
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Caminhada Cureton et al 1609m
        if (this.protocolo === 22) {
          this.showLineChart = false;
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Corrida Cooper
        if (this.protocolo === 25) {
          multi = [...multi, {
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
          }];
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Bicicleta Astrand
        if (this.protocolo === 30) {
          multi = [...multi, {
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
          }];
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Bicicleta Blake
        if (this.protocolo === 27) {
          multi = [...multi, {
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
                name: '18',
                value: ln.min18
              }
            ]
          }];
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Bicicleta YMCA
        if (this.protocolo === 28) {
          multi = [...multi, {
            name: ln.data,
            series: [
              {
                name: '25W',
                value: ln.min0
              },
              {
                name: '50W',
                value: ln.min2
              },
              {
                name: '75W',
                value: ln.min4
              },
              {
                name: '100W',
                value: ln.min6
              },
              {
                name: '125W',
                value: ln.min8
              },
              {
                name: '150W',
                value: ln.min10
              },
              {
                name: '175W',
                value: ln.min12
              },
              {
                name: '200W',
                value: ln.min14
              },
              {
                name: '225W',
                value: ln.min16
              },
              {
                name: '250W',
                value: ln.min18
              }
            ]
          }];
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        // Banco Katch
        if (this.protocolo === 36) {
          this.showLineChart = false;
          this.dados.VO2Est = ln.c_vo2e;
          this.dados.VO2Obt = ln.c_vo2m;
        }

        this.dados.data = ln.data;
        this.result.push(this.dados);
        this.dados = [];

      });

    // GRAFICO BARRAS DO VO2
    const VO2Obt = [];
    const VO2Est = [];

    this.result.forEach(element => {
      VO2Obt.push({ name: element.data, value: element.VO2Obt });
      VO2Est.push({ name: element.data, value: element.VO2Est });
    });

    const multi2 = [
      {
        name: 'Obtido',
        series: [...VO2Obt]
      },
      {
        name: 'Estimado',
        series: [...VO2Est]
      }
    ];
    //  this.ready = true;
    Object.assign(this, { multi });
    Object.assign(this, { multi2 });

  }

}
