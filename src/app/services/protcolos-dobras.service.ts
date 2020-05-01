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
    if (morfo.sexo == 'M') {
      this.perGordura = +(0.735 * (+morfo.triciptal + +morfo.geminal) + 1).toFixed(2);
    } else {
      this.perGordura = +(0.610 * (+morfo.triciptal + +morfo.geminal) + 5.1).toFixed(2);
    }
    const answer = this.createAnswer();
    return answer;
  }

  protocoloJacksonPollok3d(morfo, gorduraDesejada) {
    // Mas  DC = 1.109380 - 0.0008267 * somaDobras + 0.0000016* somaDobras^2 - 0.0002574 * idade
    // Fem  DC = 1,0994921 -0,0009929 somat dobras +0,0000023 somat dobras ^2 -0,0001392 idade
    // %G = ((5,26/ DC) - 4,83) * 100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;

    if (morfo.sexo == 'M') { // Masculino
      const somatorio = +morfo.peitoral + +morfo.abdominal + +morfo.crural;
      const DC = 1.109380 - 0.0008267 * somatorio + 0.0000016 * Math.pow(somatorio, 2) - 0.0002574 * morfo.idade;
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    } else {  // Femenino
      const somatorio = +morfo.triciptal + +morfo.suprailiaca + +morfo.crural;
      const DC = 1.0994921 - 0.0009929 * somatorio + 0.0000023 * Math.pow(somatorio, 2) - 0.0001392 * morfo.idade;
      this.perGordura = +(((5.26 / DC) - 4.83) * 100).toFixed(2);
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloJacksonPollok4d(morfo, gorduraDesejada) {
    // Mas  %G = (0,29288* soma)-(0,0005*soma^2)+(0,15845*idade)-5,76372
    // Fem  %G = (0,29669* soma)-(0,00043*soma^2)+(0,02963*idade)+1,4072
    // %G = ((5,26/ DC) - 4,83) * 100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const somatorio = +morfo.triciptal + +morfo.suprailiaca + +morfo.abdominal + +morfo.crural;
    if (morfo.sexo == 'M') { // Masculino
      this.perGordura = 0.29288 * somatorio - 0.0005 * Math.pow(somatorio, 2) + 0.15845 * +morfo.idade - 5.76372;
    } else {  // Femenino
      this.perGordura = 0.29669 * somatorio - 0.00043 * Math.pow(somatorio, 2) + 0.02963 * +morfo.idade - 1.4072;
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloDurninWormersley4d(morfo, gorduraDesejada) {
    // Masc  DC = 1,1765-0,0744 log Somat dobras
    // Fem   DC = 1,1567-0,0717 log Somat dobras
    // %G = ((5,26/ DC) - 4,83) * 100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const somatorio = +morfo.biciptal + +morfo.triciptal + +morfo.subescapular;
    if (morfo.sexo == 'M') { // Masculino
      const DC = 1.1765 - 0.0744 * Math.log(somatorio);
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    } else {  // Feminino
      const DC = 1.1567 - 0.0717 * Math.log(somatorio);
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloSloan2d(morfo, gorduraDesejada) {
    // Masc  DC  = 1,10430 -0,00133 coxa - 0,00131 subescap
    // Femi  DC = 1,07640 -0,00081 suprail - 0,00088 tríceps
    // %G=[(4,57/DC)-4,142]*100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    if (morfo.sexo == 'M') { // Masculino
      const DC = 1.10430 - 0.00133 * +morfo.crural - 0.00131 * morfo.subescapular;
      this.perGordura = +(((4.57 / DC) - 4.142) * 100).toFixed(2);
    } else {  // Feminino
      const DC = 1.07640 - 0.00081 * +morfo.suprailiaca - 0.00088 * morfo.tríceps;
      this.perGordura = +(((4.57 / DC) - 4.142) * 100).toFixed(2);
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloGuedes3d(morfo, gorduraDesejada) {
    // Masculino  Dc=1,17136 - 06706 log(somat dobras)   ---- (tríceps, abdominal,suprailíaca)
    // Feminino  DC=1,16650 - 07063 log(somat dobras)  ----- (subescapular,coxa, suprailíaca) em milimetros
    // %G=[(4,95/Dc) - 4,50]*100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    if (morfo.sexo == 'M') { // Masculino
      const somatorio = +morfo.abdominal + +morfo.triciptal + +morfo.suprailiaca;
      const DC = 1.17136 - 0.06706 * Math.log(somatorio);
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    } else {  // Feminino
      const somatorio = +morfo.subescapular + +morfo.crural + +morfo.suprailiaca;
      const DC = 1.16650 - 0.07063 * Math.log(somatorio);
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloCarter6d() { }

  protocoloJacksonPollok7d(morfo, gorduraDesejada) {
    // Masc  DC = 1,1120 -0,00043499 somat dobras +0,00000055 somat dobras ^2 -0,00028826 idade
    // %G=[(4,95/Db)-4,50]*100
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const somatorio = +morfo.abdominal + +morfo.triciptal + +morfo.suprailiaca + +morfo.subescapular
      + +morfo.peitoral + +morfo.axilar + +morfo.crural;
    const DC = 1.1120 - 0.00043499 * somatorio + 0.00000055 * Math.pow(somatorio, 2) - 0.00028826 * morfo.idade;
    this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloWilmoreBehnk2d(morfo, gorduraDesejada) {
    // Masculino DC = 1,08543-0,000886*(abdominal)-0,0004*(coxa)
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const somatorio = +morfo.abdominal + +morfo.crural;
    const DC = 1.08543 - 0.000886 * morfo.abdominal - 0.0004 * morfo.crural;
    this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloWilmoreBehnk3d(morfo, gorduraDesejada) {
    // Feminino DC = 1,06234-0,00068*(subescapular)-0,00039*(triciptal)-0,00025*(coxa)
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const DC = 1.06234 - 0.00068 * +morfo.subescapular - 0.00039 * +morfo.triciptal - 0.00025 * +morfo.crural;
    this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloPetroski(morfo, gorduraDesejada) {
    // Masculino  DC = 1,10726863-(0,00081201*( soma dobras))+(0,00000212*(soma dobras))-0,00041761 * idade
    // Feminino  DC = =1,1954713-0,07513507*LOG10(soma dobras)-0,00041072* idade
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    if (morfo.sexo == 'M') { // Masculino
      const somatorio = +morfo.suprailiaca + +morfo.triciptal + +morfo.subescapular + +morfo.geminal;
      const DC = 1.10726863 - 0.00081201 * somatorio + 0.00000212 * somatorio - 0.00041761 * +morfo.idade;
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    } else {  // Feminino
      const somatorio = +morfo.axilar + +morfo.suprailiaca + +morfo.crural + +morfo.geminal;
      const DC = 1.1954713 - 0.07513507 * Math.log10(somatorio) - 0.00041072 * morfo.idade;
      this.perGordura = +(((4.95 / DC) - 4.50) * 100).toFixed(2);
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  protocoloWilliams4d(morfo, gorduraDesejada) {
    // Masculino  %G=0,573 somat dobras -0,0022 somat dobras^2 +0,107 idade -9,35
    // Feminino  %G=0,428 somat dobras -0,00112 somat dobras^2 +0,127 idade -3,01
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    const somatorio = +morfo.abdominal + +morfo.triciptal + +morfo.subescapular + +morfo.geminal;
    if (morfo.sexo == 'M') { // Masculino
      this.perGordura = 0.573 * somatorio - 0.0022 * Math.pow(somatorio, 2) + 0.107 * +morfo.idade - 9.35;
    } else {  // Feminino
      this.perGordura = 0.428 * somatorio - 0.00112 * Math.pow(somatorio, 2) + 0.127 * +morfo.idade - 3.01;
    }
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  // PROTOCOLOS DE ANTROPOMETRIA
  // Tran & Weltman
  protocoloTranWeltman(morfo, gorduraDesejada) {
    console.table(morfo);
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    // Precisa da formula
    this.perGordura = 22.00;
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  //  Weltman Seip & Tran
  protocoloWeltmanSpeinTran(morfo, gorduraDesejada) {
    console.table(morfo);
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    //  formula
    this.perGordura = 0.31457 * morfo.abdomen - 0.10969 * morfo.peso + 10.8336;
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

  // Weltman
  protocoloWeltman(morfo, gorduraDesejada) {
    console.table(morfo);
    this.gorduraDesejada = gorduraDesejada;
    this.morfo = morfo;
    // Precisa da formula
    this.perGordura = 22.00;
    const answer = this.createAnswer();
    console.table(answer);
    return answer;
  }

    // Mayhew et al
    protocoloMayhewEtAl(morfo, gorduraDesejada) {
      console.table(morfo);
      this.gorduraDesejada = gorduraDesejada;
      this.morfo = morfo;
      // Precisa da formula
      this.perGordura = 22.00;
      const answer = this.createAnswer();
      console.table(answer);
      return answer;
    }

  // não está a ser usada.
  getGorduraDesejada() {
    return 20;  // só para testes
  }

  // Criar JSON com resposta
  createAnswer() {
    const resp = {
      perGordura: this.perGordura.toFixed(2),
      gorduraDesejada: this.gorduraDesejada,
      gorduraExcesso: this.calcGorduraExcesso().toFixed(2),
      percLivreGordura: this.calcLivreGordura().toFixed(2),
      massaIsentaGordura: this.calcMassaIsentaGordura().toFixed(2),
      pesoGordo: this.calcPesoGordura().toFixed(2),
      pesoAtual: this.morfo.peso,
      pesoSugerido: this.calcPesoSugerido().toFixed(2),
      pesoExcesso: this.calcPesoExcesso().toFixed(2),
      pesoOsseo: this.calcPesoOsseo().toFixed(2),
      pesoResidual: this.calcPesoResidual().toFixed(2),
      pesoMuscular: this.calcPesoMuscular().toFixed(2)
    };
    console.table(resp);
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
    // MASCULINO   pesoOsseo = 0.302 * (altura.m ^2 * (punho/10) * (joelho/10) * 400)^0.72
    return 3.02 * Math.pow(Math.pow(+this.morfo.altura, 2)
      * (+this.morfo.punho / 100) * (+this.morfo.joelho / 100) * 400, 0.72);
  }

  calcPesoResidual() {
    // MASCULINO   pesoResidual = pesoTotal * 20,9 /100
    if (this.morfo.sexo == 'M') {
      return +(+this.morfo.peso * 0.241);
    } else {
      return +(+this.morfo.peso * 0.209);
    }
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
