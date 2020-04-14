import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';

@Component({
  selector: 'app-wb2',
  templateUrl: './wb2.component.html',
  styleUrls: ['./wb2.component.scss']
})
export class WB2Component implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  sexo: string;
  // graphics
  single: any[];
  single2: any[];
  view: any[] = [250, 250];
  showChart = false;

  // options
  gradient = true;
  showLegend = true;
  showLabels = false;
  isDoughnut = false;
  legendPosition = 'top';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1010FF', '#BF00FF', '#00FFFF']
  };

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private protocolos: ProtcolosDobrasService
               ) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.sexo = this.student.sexo;
    if (this.sexo == 'F') {
        this.openSnackBar('Atenção: Este protocolo não é apropriado para este aluno!', '');
    }
    this.getData();
  }

  getData() {
    // Protocolo Wilmore & Behnke - 16
    this.dataService.getData('clients/morfo/16/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer], this.pointer);
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
   }

  // Seleciona a data que está a mostrar
  setEvaluation(evaluation, p) {
    this.selectedEvaluation = evaluation;
    this.startGraphics(evaluation);
  }

  // Iniciar os graficos
  startGraphics(evaluation) {
    // Obter os dados do aluno: Avaliações e Corporal para obter o peso, altura, punho e 
    this.dataService.getData('clients/eval/' + this.student.id + '/' + evaluation.data).subscribe(
      (respa: any[]) => {
        if (respa.length) {
          this.dataService.getData('clients/morfo/medidas/' + this.student.id).subscribe(
            (respm: any[]) => {
              if (respm.length) {
                const morfo = respm.pop();
                evaluation.altura = respa[0].altura;
                evaluation.peso = respa[0].peso;
                evaluation.punho = morfo.punho;
                evaluation.joelho = morfo.joelho;
                evaluation.sexo = this.student.sexo;
                const proto = this.protocolos.protocoloWilmoreBehnk2d(evaluation, this.gorduraDesejada);
                // Create graphic
                this.showChart = true;
                this.single = [{ name: '% Gordura atual', value: proto.perGordura },
                                { name: '% Gordura desejada', value: proto.gorduraDesejada },
                                { name: '% Gordura em excesso', value: proto.gorduraExcesso },
                                { name: '% Livre de gordura', value: proto.percLivreGordura }
                              ];
                Object.assign(this,  this.single );
                // Create graphic 2
                const single2 = [{ name: 'Peso atual(Kg)', value: proto.pesoAtual },
                                { name: 'Peso sugerido(Kg)', value: proto.pesoSugerido },
                                { name: 'Peso em excesso(Kg)', value: proto.pesoExcesso },
                                { name: 'Peso osseo(Kg)', value: proto.pesoOsseo },
                                { name: 'Peso residual(Kg)', value: proto.pesoResidual },
                                { name: 'Peso muscular(Kg)', value: proto.pesoMuscular }
                              ];
                Object.assign(this, { single2 });
              } else {
                this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação!', '');
              }
            }
          );
        } else {
          this.openSnackBar('Atenção: Não existem avaliações complementares para esta data!', '');
          this.showChart = false;
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
    form.protocolo = 16;
    this.dataService.setData('clients/morfo/' + this.student.id, form).subscribe(
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
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
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
