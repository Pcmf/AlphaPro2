import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';
import { AgeService } from 'src/app/services/age.service';

@Component({
  selector: 'app-chart-compare',
  templateUrl: './chart-compare.component.html',
  styleUrls: ['./chart-compare.component.scss']
})

export class ChartCompareComponent implements OnInit {

  @Input() id: number;
  @Input() protocolo: number;
  @Input() percgd: number;

  // Grafico
  multi: any[];
  multi2: any[];
  view = [360, 300];
  student: any = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Avaliações';
  showYAxisLabel = true;
  yAxisLabel1 = '%';
  yAxisLabel2 = 'Kg';
  legendPosition = 'bottom';
  legendTitle = '';
  barPadding = 0;
  groupPadding = 5;

  colorScheme = {
    domain: ['#87CEEB', '#00BFFF', '#1E90FF', '#0000FF', '#0000CD', '#191970']
  };

  result: any = [];

  constructor(private dataService: DataService,
              private protocolos: ProtcolosDobrasService,
              private ageService: AgeService
    ) {
      this.student = JSON.parse(sessionStorage.selectedStudent);
   }

  ngOnInit(): void {
    this.dataService.getData('clients/morfo/' + this.protocolo + '/' + this.id).subscribe(
      (resp: any []) => {
    //    console.log(resp);
        resp.map((ln) => {
          this.dataService.getData('clients/corporal/' + this.id + '/' + ln.data).subscribe(
            (respc: any []) => {
              ln.sexo = this.student.sexo;
              ln.idade = this.ageService.getAgeFromDate1(ln.data, this.student.dt_nasc);
              ln.joelho = respc[0].joelho;
              ln.punho = respc[0].punho;
              const dados: any =  this.protocolos.protocoloJacksonPollok3d(ln, this.percgd);
              dados.data = ln.data;
              this.result.push(dados);
            }

          );

        });
        setTimeout(() => {
        console.log(this.result);
        // % gorduras
        const gorduras = [];
        const excessos = [];
        const livres = [];
        const desejadas = [];
        // pesos
        const pesoAtual = [];
        const pesoExcesso = [];
        const pesoSugerido = [];
        const pesoOsseo = [];
        const pesoResidual = [];
        const pesoMuscular = [];

        this.result.forEach(element => {
          gorduras.push({name: element.data, value: element.perGordura});
          excessos.push({name: element.data, value: element.gorduraExcesso});
          livres.push({name: element.data, value: element.percLivreGordura});
          desejadas.push({name: element.data, value: element.gorduraDesejada});

          pesoAtual.push({name: element.data, value: element.pesoAtual});
          pesoExcesso.push({name: element.data, value: element.pesoExcesso});
          pesoSugerido.push({name: element.data, value: element.pesoSugerido});
          pesoOsseo.push({name: element.data, value: element.pesoOsseo});
          pesoResidual.push({name: element.data, value: element.pesoResidual});
          pesoMuscular.push({name: element.data, value: element.pesoMuscular});
        });

        const multi = [
          {
            name: '% Gordura',
            series: [ ...gorduras ]
          },
          {
            name: '% Excesso',
            series: [ ...excessos ]
          },
          {
            name: '% Livre',
            series: [ ...livres ]
          },
          {
            name: '% Desejada',
            series: [ ...desejadas ]
          }
        ];

        const multi2 = [
          {
            name: 'Peso',
            series: [ ...pesoAtual ]
          },
          {
            name: 'Sugerido',
            series: [ ...pesoSugerido ]
          },
          {
            name: 'Excesso',
            series: [ ...pesoExcesso ]
          },
          {
            name: 'Muscular',
            series: [ ...pesoMuscular ]
          },
          {
            name: 'Osseo',
            series: [ ...pesoOsseo ]
          },
          {
            name: 'Residual',
            series: [ ...pesoResidual ]
          }
        ];
        Object.assign(this, {multi});
        Object.assign(this, {multi2});

        }, 700);
      }
    );
  }

}


