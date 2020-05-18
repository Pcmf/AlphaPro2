import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtocolosCardioService {

  constructor() { }

  getVO2Est(evaluation, classe) {
    if (evaluation.sexo === 'M' && classe === 1) {
      return +(57.8 - 0.445 * +evaluation.idade);
    }
    if (evaluation.sexo === 'M' && classe > 1) {
      return +(69.7 - 0.612 * +evaluation.idade);
    }
    if (evaluation.sexo === 'F' && classe === 1) {
      return +(42.3 - 0.356 * +evaluation.idade);
    }
    if (evaluation.sexo === 'F' && classe > 1) {
      return +(42.9 - 0.312 * +evaluation.idade);
    }
  }

  getVO2ObtRockport(ln) {
    let sexFx = 0;
    if (ln.sexo === 'M') { sexFx = 6.315; }
    const res = +(132.853 - 0.0769 * +ln.peso * 2.205 - 0.3877 * +ln.idade + +sexFx - 3.2649 *
          (Math.trunc(+ln.c_tempo) + (+ln.c_tempo - Math.trunc(+ln.c_tempo)) / 60 )
          - 0.1565 * +ln.fc);
    return res.toFixed(2);
  }

  getVO2ObtCooper(evaluation) {
      return +((evaluation.distancia - 504) / 45);
  }

  getVO2ObtAstrand(evaluation) {
    if (evaluation.sexo === 'M') {
      return +(((1000 * ((195 - 61) / (((evaluation.fc2 + evaluation.fc) / 2) - 61))
      * (((0.014 * evaluation.carga) + 0.129))) / evaluation.peso) * evaluation.idade);
    } else {
      return +(((1000 * ((198 - 72) / (((evaluation.fc2 + evaluation.fc) / 2) - 72))
      * (((0.014 * evaluation.carga) + 0.129))) / evaluation.peso) * evaluation.idade);
    }
  }
}
