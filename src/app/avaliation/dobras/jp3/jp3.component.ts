import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { AgeService } from 'src/app/services/age.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProtcolosDobrasService } from 'src/app/services/protcolos-dobras.service';

@Component({
  selector: 'app-jp3',
  templateUrl: './jp3.component.html',
  styleUrls: ['./jp3.component.scss']
})
export class JP3Component implements OnInit {
  student: any = [];
  evaluation: any = [];
  selectedEvaluation: any = [];
  addEval = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  age: number;

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


  constructor(private location: Location, private dataService: DataService,
              private datapipe: DatePipe,
              private menuService: MenuService,
              private ageService: AgeService,
              private snackBar: MatSnackBar,
              private protocolos: ProtcolosDobrasService
  ) {

    this.student = JSON.parse(sessionStorage.selectedStudent);

    this.age = this.ageService.getAge(this.student.dt_nasc);
    if (this.student.sexo == 'M' && (this.age < 18 || this.age > 61)) {
      this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
    }
    if (this.student.sexo == 'F' && (this.age < 18 || this.age > 55)) {
      this.openSnackBar('Atenção: Este protocolo não deve ser usado com este aluno!', '');
    }

    this.getData();
  }

  getData() {
    /* Protocolo Jackson Pollok 3d - 3 */
    this.dataService.getData('clients/morfo/3/' + this.student.id).subscribe(
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
          this.dataService.getData('clients/morfo/medidas/' + this.student.id).subscribe(
            (respm: any[]) => {
              if (respm.length) {
                const morfo = respm.pop();
                evaluation.altura = respa[0].altura;
                evaluation.peso = respa[0].peso;
                evaluation.punho = morfo.punho;
                evaluation.joelho = morfo.joelho;
                evaluation.idade = this.age;
                evaluation.sexo = this.student.sexo;
                const proto = this.protocolos.protocoloJacksonPollok3d(evaluation, this.gorduraDesejada);
                // Create graphic
                this.showChart = true;
                this.single = [{ name: 'Gordura atual: ' + proto.perGordura + '%', value: proto.perGordura },
                { name: 'Gordura desejada: ' + proto.gorduraDesejada + '%', value: proto.gorduraDesejada },
                { name: 'Gordura em excesso: ' + proto.gorduraExcesso + '%', value: proto.gorduraExcesso },
                { name: 'Livre de gordura: ' + proto.percLivreGordura + '%', value: proto.percLivreGordura }
                ];
                Object.assign(this, this.single);
                // Create graphic 2
                const single2 = [{ name: 'Peso atual: ' + proto.pesoAtual + 'Kg' , value: proto.pesoAtual },
                { name: 'Peso sugerido: ' + proto.pesoSugerido + 'Kg', value: proto.pesoSugerido },
                { name: 'Peso em excesso: ' + proto.pesoExcesso + 'Kg', value: proto.pesoExcesso },
                { name: 'Peso osseo: ' + proto.pesoOsseo + 'Kg', value: proto.pesoOsseo },
                { name: 'Peso residual: ' + proto.pesoResidual + 'Kg', value: proto.pesoResidual },
                { name: 'Peso muscular: ' + proto.pesoMuscular + 'Kg', value: proto.pesoMuscular }
                ];
                Object.assign(this, { single2 });
              } else {
                this.openSnackBar('Atenção: Faltam algumas medições para esta avaliação!', '');
                this.showChart = false;
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
    form.protocolo = 3;
    console.log(this.student.id);
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
