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
  @Input() evaluations: any[];

  // Grafico
  multi1: any[];
  multi2: any[];
  multi3: any[];
  multi4: any[];
  multi5: any[];
  view = [250, 250];
  student: any = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Avaliações';
  showYAxisLabel = true;
  yAxisLabel1 = '%';
  yAxisLabel2 = 'Kg';
  legendPosition = 'bottom';
  legendTitle = 'Avaliações';
  barPadding = 0;
  groupPadding = 5;

  colorScheme = {
    domain: ['#87CEEB', '#00BFFF', '#1E90FF', '#0000FF', '#0000CD', '#191970']
  };

  result: any = [];
  private dados: any = [];

  constructor(
      private dataService: DataService,
      private protocolos: ProtcolosDobrasService,
      private ageService: AgeService
  ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
  }

  ngOnInit(): void {
    if (this.protocolo === 9 || this.protocolo === 32 || this.protocolo === 33 || this.protocolo === 14 ||
       this.protocolo === 17 || this.protocolo === 18) {

          this.evaluations.map((ln) => {
            ln.sexo = this.student.sexo;
            ln.idade = this.ageService.getAgeFromDate1(ln.data, this.student.dt_nasc);
            switch (+this.protocolo) {
              case 9:
                this.dados = this.protocolos.protocoloDeuremberg(ln, this.percgd);
                break;
              case 32:
                  this.dados = this.protocolos.protocoloVogel(ln, this.percgd);
                  break;
              case 33:
                this.dados = this.protocolos.protocoloWeltmanEtAl(ln, this.percgd);
                break;
              case 14:
                this.dados = this.protocolos.protocoloTranWeltman(ln, this.percgd);
                break;
            }
            this.dados.data = ln.data;
            this.result.push(this.dados);
            this.startCharts();
          });


    } else {
    this.dataService.getData('clients/morfo/' + this.protocolo + '/' + this.id).subscribe(
      (resp: any[]) => {
        resp.map((ln) => {
          ln.sexo = this.student.sexo;
          ln.idade = this.ageService.getAgeFromDate1(ln.data, this.student.dt_nasc);
          //    const dados: any =  this.protocolos.protocoloJacksonPollok3d(ln, this.percgd);
          switch (+this.protocolo) {
            case 1:
              this.dados = this.protocolos.protocoloGuedes3d(ln, this.percgd);
              break;
            case 2:
              this.dados = this.protocolos.protocoloFaulkner4d(ln, this.percgd);
              break;
            case 3:
              this.dados = this.protocolos.protocoloJacksonPollok3d(ln, this.percgd);
              break;
            case 4:
              this.dados = this.protocolos.protocoloJacksonPollok7d(ln, this.percgd);
              break;
            case 5:
              this.dados = this.protocolos.protocoloDurninWormersley4d(ln, this.percgd);
              break;
            case 6:
              this.dados = this.protocolos.protocoloSlaughter2d(ln, this.percgd);
              break;
            case 10:
              this.dados = this.protocolos.protocoloPetroski(ln, this.percgd);
              break;
            case 11:
              this.dados = this.protocolos.protocoloWilliams4d(ln, this.percgd);
              break;
            case 12:
              this.dados = this.protocolos.protocoloSloan2d(ln, this.percgd);
              break;
            case 15:
              this.dados = this.protocolos.protocoloWilmoreBehnk3d(ln, this.percgd);
              break;
            case 16:
              this.dados = this.protocolos.protocoloWilmoreBehnk2d(ln, this.percgd);
              break;
            default:
              break;
          }
          this.dados.data = ln.data;
          this.result.push(this.dados);
          this.startCharts();
        });
      }
    );
    }
  }


  startCharts() {
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
        gorduras.push({ name: element.data, value: element.perGordura });
        excessos.push({ name: element.data, value: element.gorduraExcesso });
        livres.push({ name: element.data, value: element.percLivreGordura });
        desejadas.push({ name: element.data, value: element.gorduraDesejada });

        pesoAtual.push({ name: element.data, value: element.pesoAtual });
        pesoExcesso.push({ name: element.data, value: element.pesoExcesso });
        pesoSugerido.push({ name: element.data, value: element.pesoSugerido });
        pesoOsseo.push({ name: element.data, value: element.pesoOsseo });
        pesoResidual.push({ name: element.data, value: element.pesoResidual });
        pesoMuscular.push({ name: element.data, value: element.pesoMuscular });
      });

      const multi1 = [
        {
          name: '% Gordura',
          series: [...gorduras]
        },
        {
          name: '% Excesso',
          series: [...excessos]
        }
      ];

      const multi2 = [
        {
          name: '% Livre',
          series: [...livres]
        }
      ];

      const multi3 = [
        {
          name: 'Muscular',
          series: [...pesoMuscular]
        }
      ];

      const multi4 = [
        {
          name: 'Ósseo',
          series: [...pesoOsseo]
        },
        {
          name: 'Residual',
          series: [...pesoResidual]
        }
      ];

      const multi5 = [
        {
          name: 'Peso',
          series: [...pesoAtual]
        },
        {
          name: 'Sugerido',
          series: [...pesoSugerido]
        }
      ];

      Object.assign(this, { multi1 });
      Object.assign(this, { multi2 });
      Object.assign(this, { multi3 });
      Object.assign(this, { multi4 });
      Object.assign(this, { multi5 });
    }, 700);
  }

}


