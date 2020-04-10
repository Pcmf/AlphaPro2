import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProtcolosDobrasService {

  private student: any = [];
  private perGordura: number;
  private gorduraDesejada: number;  // deve ser obtida de uma tabela provavlemente dependendo de varios factores
  private morfo: any = [];


  constructor(private dataService: DataService) {
    this.student = JSON.parse(sessionStorage.selectedStudent);
  }




  // PROTOCOLOS
  protocoloSlaughter2d(morfo, gorduraDesejada) {
      this.gorduraDesejada = gorduraDesejada;
      this.morfo = morfo;
      // Masculino
      this.perGordura = +(0.735 * (+morfo.triciptal + +morfo.geminal) + 1).toFixed(3);
      const answer =  this.createAnswer();
      console.table(answer);
      return answer;
      // Feminino
      //    this.perGordura = +(0.610 * (+morfo.triciptal + +morfo.geminal) + 5.1).toFixed(3);

  }

  protocoloJacksonPollok3d() {
    // M  DC = 1.109380 - 0.0008267 * somaDobras + 0.0000016* somaDobras^2 - 0.0002574 * idade
  }

  protocoloDurninWormersley4d() { }

  protocoloSloan2d() { }

  protocoloGuedes3d() { }

  protocoloCarter6d() { }

  protocoloJacksonPollok7d() { }

  protocoloWilmoreBehnk2d() { }

  protocoloWilmoreBehnk3d() { }

  protocoloWilliams4d() { }

  getGorduraDesejada() {
    return 20;  // só para testes
  }

  // Criar JSON com resposta
  createAnswer() {
    const resp = {
      perGordura: this.perGordura,
      gorduraDesejada: this.gorduraDesejada,
      gorduraExcesso: this.calcGorduraExcesso().toFixed(3),
      percLivreGordura: this.calcLivreGordura().toFixed(3),
      massaIsentaGordura: this.calcMassaIsentaGordura().toFixed(3),
      pesoGordo: this.calcPesoGordura().toFixed(3),
      pesoAtual: this.morfo.peso,
      pesoSugerido: this.calcPesoSugerido().toFixed(3),
      pesoExcesso: this.calcPesoExcesso().toFixed(3),
      pesoOsseo: this.calcPesoOsseo().toFixed(3),
      pesoResidual: this.calcPesoResidual().toFixed(3),
      pesoMuscular: this.calcPesoMuscular().toFixed(3)
    };
    return resp;
  }


  // CALCULOS

  calcPesoExcedente() {
    // pesoExcedente = ((%gordura - %gorduraEstimado) x pesoTotal / 100
    return +((+this.perGordura - +this.calcGorduraEstimada()) * this.morfo.peso / 100);
  }

  calcPesoGordura() {
    // pesoGordura = pesoTotal * %gordura /100
    return +this.morfo.peso * +this.perGordura / 100;
  }


  calcMCM() {
    // massa corporal magra = pesoTotal - pesoGordura
  }

  calcPesoOsseo() {
    // Difere de masculino para feminino ? 
    // MASCULINO   pesoOsseo = 0.302 * (altura.m ^2 * (punho/100) * (joelho/100) * 400)^0.72
    return Math.pow(3.02 * Math.pow(+this.morfo.altura, 2)
      * +this.morfo.punho / 100 * +this.morfo.joelho / 100 * 400, 0.72);
  }

  calcPesoResidual() {
    // MASCULINO   pesoResidual = pesoTotal * 20,9 /100
    return +(+this.morfo.peso * 0.209);
  }

  calcPesoMuscular() {
    // MASCULINO   pesoMuscular = pesoTotal - pesoOsseo -pesoGordo - pesoResidual
    return +(+this.morfo.peso - this.calcPesoOsseo() - +this.calcPesoGordura() - +this.calcPesoResidual());
  }

  calcMassaIsentaGordura() {
    // MASCULINO   MIG = pesoTotal - pesoGordura
    return +this.morfo.peso - +this.calcPesoGordura();
  }

  calcPesoSugerido() {
    // MASCULINO   pesoSugerido = MIG/(1-%gorduraDesejada/100)
    return +this.calcMassaIsentaGordura() / (1 - +this.gorduraDesejada / 100);
  }

  calcGorduraEstimada() {
    // MASCULINO    %gorduraEstimada = %gordura - %gorduraDesejada
    return +(+this.perGordura - +this.gorduraDesejada);
  }

  calcPesoExcesso() {
    // MASCULINO    pesoExcesso =  pesoTotal - pesoSugerido
    return +(+this.morfo.peso - +this.calcPesoSugerido());
  }

  calcGorduraExcesso() {
    // gorduraExcesso = %gordura - gorduraDesejada
    return +(this.perGordura - this.gorduraDesejada);
  }

  calcLivreGordura() {
    // ??
    return +this.calcMassaIsentaGordura() / +this.morfo.peso * 100;
  }

  calcMassaMagraEstimada() {
    // ??
    return 0;
  }
}
