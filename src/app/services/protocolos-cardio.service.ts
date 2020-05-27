import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtocolosCardioService {

  constructor() { }

  getVO2Est(evaluation) {
    let genero = 0;
    evaluation.sexo === 'M' ? genero = 1 : genero = 0;
    return +(0.133 * +evaluation.idade - 0.005 * Math.pow(+evaluation.idade, 2) + 11.405 * genero + 1.463 * +evaluation.nafs
            + 9.17 * +evaluation.altura - 0.254 * +evaluation.peso + 34.142);
  }

  getVO2ObtRockport(ln) {
    let sexFx = 0;
    if (ln.sexo === 'M') { sexFx = 6.315; }
    const min = this.getMinutes(ln.c_tempo);
    const sec = this.getSeconds(ln.c_tempo);
    const res = +(132.853 - 0.0769 * +ln.peso * 2.205 - 0.3877 * +ln.idade + +sexFx - 3.2649 * min + sec / 60 - 0.1565 * +ln.fc);
    return res.toFixed(2);
  }


  getVO2ObtCooper(evaluation) {
    return +((evaluation.distancia - 504) / 45);
  }

  getVO2ObtAstrand(evaluation) {
    const fx = this.getAstrandFactorCorrecao(evaluation.idade);
    const C43 = +((0.014 * +evaluation.carga + 0.129) * fx).toFixed(4);
    const J43 = +((+evaluation.min10 + +evaluation.fc) / 2).toFixed(4);
    if (evaluation.sexo === 'M') {
        const D48 = +(134 / (J43 - 61) * C43).toFixed(4);
        return +(1000 * D48 / +evaluation.peso).toFixed(2);
    } else {
        const I48 = +(126 / (J43 - 72) * C43).toFixed(4);
        return +(1000 * I48 / +evaluation.peso).toFixed(2);
    }
  }


  private getSeconds(tempo: string) {
    return +(tempo.slice(-2));
  }
  private getMinutes(tempo: string) {
    return +(tempo.slice(0, 2));
  }


  private getAstrandFactorCorrecao(idade) {
    if (idade < 25 ) { return 1.1; }
    if (idade < 36 ) { return 1; }
    if (idade > 65 ) { return 0.65; }
    const FactorCorrecao = [
      {idade: 36, factor: 0.87},
      {idade: 37, factor: 0.87},
      {idade: 38, factor: 0.87},
      {idade: 39, factor: 0.86},
      {idade: 40, factor: 0.83},
      {idade: 41, factor: 0.83},
      {idade: 42, factor: 0.83},
      {idade: 43, factor: 0.82},
      {idade: 44, factor: 0.81},
      {idade: 45, factor: 0.78},
      {idade: 46, factor: 0.78},
      {idade: 47, factor: 0.78},
      {idade: 48, factor: 0.78},
      {idade: 49, factor: 0.77},
      {idade: 50, factor: 0.75},
      {idade: 51, factor: 0.75},
      {idade: 52, factor: 0.74},
      {idade: 53, factor: 0.73},
      {idade: 54, factor: 0.72},
      {idade: 55, factor: 0.71},
      {idade: 56, factor: 0.70},
      {idade: 57, factor: 0.69},
      {idade: 58, factor: 0.69},
      {idade: 59, factor: 0.68},
      {idade: 60, factor: 0.68},
      {idade: 61, factor: 0.66},
      {idade: 62, factor: 0.65},
      {idade: 63, factor: 0.65},
      {idade: 64, factor: 0.65},
      {idade: 65, factor: 0.65}
    ];

    const resp = FactorCorrecao.filter((el) => {
      if (el.idade === idade) {
        return el.factor;
      }
    });
    return resp[0].factor;
  }

}
