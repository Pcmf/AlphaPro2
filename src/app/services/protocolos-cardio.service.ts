import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtocolosCardioService {

  constructor() { }

  getVO2ObtRockport(evaluation) {
    let sexFx = 0;
    if (evaluation.sexo === 'M') { sexFx = 6.315; }
    return +(132.853 - 0.0769 * evaluation.peso * 2.205 - 0.3877 * evaluation.idade + sexFx - 3.2649 *
          (Math.trunc(evaluation.c_tempo) + (evaluation.c_tempo - Math.trunc(evaluation.c_tempo)) / 60 )
          - 0.1565 * evaluation.fc);
  }

  getVO2Est(evaluation) {
    return +(56.376 + 1.589 * evaluation.naf - 0.289 * evaluation.idade - 0.552 * evaluation.percGordura);
  }

  getVO2ObtCooper12(evaluation) {
      return +((evaluation.distancia - 504) / 45);
  }

  
}
