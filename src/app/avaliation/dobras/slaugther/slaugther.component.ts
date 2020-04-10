import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgeService } from 'src/app/services/age.service';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';

@Component({
  selector: 'app-slaugther',
  templateUrl: './slaugther.component.html',
  styleUrls: ['./slaugther.component.scss']
})
export class SlaugtherComponent implements OnInit {
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];

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

  gorduraDesejada = 20; // Este valor deverá ser obtido de uma tabela através de um serviço.


  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private snackBar: MatSnackBar,
              private ageService: AgeService,
              private protocolos: ProtcolosDobrasService) {

        this.student = JSON.parse(sessionStorage.selectedStudent);
        if (this.ageService.getAge(this.student.dt_nasc) > 16) {
          this.openSnackBar('Atenção: Este protocolo não deve ser usado neste aluno!', '');
        }
        this.getData();
  }

  getData() {
    this.dataService.getData('clients/morfo/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
          this.setEvaluation(this.evaluation[this.pointer], this.pointer);

        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
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
          console.log(respa);
          this.dataService.getData('clients/morfo/medidas/' + this.student.id).subscribe(
            (respm: any[]) => {
              if (respm.length) {
                const morfo = respm.pop();
                evaluation.altura = respa[0].altura;
                evaluation.peso = respa[0].peso;
                evaluation.punho = morfo.punho;
                evaluation.joelho = morfo.joelho;
                console.log(evaluation);
                const proto = this.protocolos.protocoloSlaughter2d(evaluation, this.gorduraDesejada);
                console.log(proto);
                // Create graphic
                const single = [{ name: '% G. atual', value: proto.perGordura },
                                { name: '% G. desejada', value: proto.gorduraDesejada },
                                { name: '% G. em excesso', value: proto.gorduraExcesso },
                                { name: '% livre de gordura', value: proto.percLivreGordura }
                              ];
                Object.assign(this, { single });

              } else {
                this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação!', '');
              }
            }
          );
        } else {
          this.openSnackBar('Atenção: Não existem avaliações complementares para esta data!', '');
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
