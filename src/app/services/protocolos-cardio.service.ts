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
    if (evaluation.sexo === 'M') {
      return +(((1000 * ((195 - 61) / (((evaluation.min10 + evaluation.fc) / 2) - 61))
      * (((0.014 * evaluation.carga) + 0.129))) / evaluation.peso) * evaluation.idade);
    } else {
      return +(((1000 * ((198 - 72) / (((evaluation.min10 + evaluation.fc) / 2) - 72))
      * (((0.014 * evaluation.carga) + 0.129))) / evaluation.peso) * evaluation.idade);
    }
  }


  private getSeconds(tempo: string) {
    return +(tempo.slice(-2));
  }
  private getMinutes(tempo: string) {
    return +(tempo.slice(0, 2));
  }
}
