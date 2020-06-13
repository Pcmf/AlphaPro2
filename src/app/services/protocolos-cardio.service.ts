import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtocolosCardioService {
  cx: number;
  cargaFinal: number;

  constructor() { }

  getVO2Est(evaluation) {
    let genero = 0;
    evaluation.sexo === 'M' ? genero = 1 : genero = 0;
    return +(0.133 * +evaluation.idade - 0.005 * Math.pow(+evaluation.idade, 2) + 11.405 * genero + 1.463 * +evaluation.nafs
            + 9.17 * +evaluation.altura - 0.254 * +evaluation.peso + 34.142).toFixed(2);
  }

  getFAI(vo2e, vo2o) {
    return +((vo2e - vo2o) / vo2e * 100).toFixed(2);
  }
  getClasseFAI(fai) {
    if (+fai < 10) { return 'Eficiência Miocárdica e bom condicionamento'; }
    if (+fai >= 10 && +fai < 25 ) { return 'Baixo condicionamento físico'; }
    if (+fai >= 25) { return 'Muito baixo condicionamento físico ou presença de cardiopatia'; }
  }

  getFCMax(form) {
    const FC = [];
    FC[0] = +form.fc;
    FC[1] = +form.min0;
    FC[2] = +form.min2;
    FC[3] = +form.min4;
    FC[4] = +form.min6;
    FC[5] = +form.min8;
    FC[6] = +form.min10;
    FC[7] = +form.min12;
    FC[8] = +form.min14;
    FC[9] = +form.min16;
    FC[10] = +form.min18;
    FC[11] = +form.min20;
    let FCMax = 0;
    FC.map( (el) => {
        if (el > FCMax) {
          FCMax = el;
        }
    });
    return FCMax;
  }

  getFCReserva(form) {
    return +(this.getFCEstimada(form.idade) - +form.fc2).toFixed(2);
  }

  getFCEstimada(idade) {
    return +(205.8 - 0.685 * +idade).toFixed(2);
  }

  getVO2ObtRockport(ln) {
    let sexFx = 0;
    if (ln.sexo === 'M') { sexFx = 6.315; }
    const min = this.getMinutes(ln.c_tempo);
    const sec = this.getSeconds(ln.c_tempo);
    const res = +(132.853 - 0.0769 * +ln.peso * 2.205 - 0.3877 * +ln.idade + +sexFx - 3.2649 * (min + sec / 60) - 0.1565 * +ln.fc);
    return res.toFixed(2);
  }

  getPercFCMax(evaluation) {
    return +((this.getFCMax(evaluation) / this.getFCEstimada(evaluation.idade)) * 100).toFixed(2);
  }

  getVO2ObtCooper(evaluation) {
    return +((evaluation.distancia - 504) / 45);
  }
  // Caminhada UKK Finlandia
  getVO2ObtUkk(evaluation) {
    const min = this.getMinutes(evaluation.c_tempo);
    const sec = this.getSeconds(evaluation.c_tempo);
    console.log(sec);
    if (evaluation.sexo === 'M') {
      return +(184 - 4.65 * (min + sec / 60) - 0.22 * evaluation.fc - 0.26 * evaluation.idade - 1.05 * evaluation.imc).toFixed(2);
    } else {
      return +(116.2 - 2.98 * (min + sec / 60) - 0.11 * evaluation.fc - 0.38 * evaluation.imc).toFixed(2);
    }
  }
  // Caminhada Cureton et al
  getVO2OObtCuretonEtAl(evaluation) {
    const min = this.getMinutes(evaluation.c_tempo);
    const sec = this.getSeconds(evaluation.c_tempo);
    evaluation.sexo === 'M' ? this.cx = 1 : this.cx = 0;
    return +(108.94 - 8.41 * (min + sec / 60) + Math.pow(0.34 * (min + sec / 60), 2)
          - 0.21 * evaluation.idade * this.cx - 0.84 * evaluation.imc).toFixed(2);
  }

  // Corrida Geroge et al 1609m
  getVO2OObtGeorgeEtAl(evaluation) {
    const min = this.getMinutes(evaluation.c_tempo);
    const sec = this.getSeconds(evaluation.c_tempo);
    evaluation.sexo === 'M' ? this.cx = 1 : this.cx = 0;
    return +(100.5 - 1.438 * (min + sec / 60) - 0.1636 * evaluation.peso - 0.1928 * evaluation.fc + 8.344 * this.cx);
  }

    // Corrida Geroge et al 3 minutos
  getVO2OObtGeorgeEtAl3m(evaluation) {
    evaluation.sexo === 'M' ? this.cx = 1 : this.cx = 0;
    return +(54.07 - 0.1938 * evaluation.peso + 4.47 * evaluation.c_vm - 0.1453 * evaluation.fc + 7.062 * this.cx);
  }

  // Bicicleta Astrand
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

  getVO2ObtBalke(evaluation) {
    return +((200 + (12 * evaluation.carga)) / evaluation.peso);
  }

  // Bicicleta YMCA
  getVO2ObtYMCA(evaluation) {
    // Calcular a carga final
     this.cargaFinal = 100;
     if (evaluation.min0 < 80 ) {
       this.cargaFinal = 175;
    }
     if (evaluation.min0 >= 80  && evaluation.min0 < 90 ) {
       this.cargaFinal = 150;
    }
     if (evaluation.min0 >= 90  && evaluation.min0 < 100 ) {
       this.cargaFinal = 125;
    }

     if (evaluation.sexo === 'M') {
      return +((10.51 * this.cargaFinal + 6.35 * evaluation.peso - 10.49 * evaluation.idade + 519.3) / evaluation.peso);
    } else {
      return +((9.39 * this.cargaFinal + 6.35 * evaluation.peso - 10.49 * evaluation.idade + 519.3) / evaluation.peso);
    }

  }

  getClasseNatacao(evaluation) {
    if (evaluation.sexo === 'F') {
      if (evaluation.idade < 30) {
        if (evaluation.distancia < 380) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 380 && evaluation.distancia < 460) { return 'Baixa'; }
        if (evaluation.distancia >= 460 && evaluation.distancia < 560) { return 'Média'; }
        if (evaluation.distancia >= 560 && evaluation.distancia < 660) { return 'Boa'; }
        if (evaluation.distancia >= 660 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 30 && evaluation.idade < 40) {
        if (evaluation.distancia < 340) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 340 && evaluation.distancia < 420) { return 'Baixa'; }
        if (evaluation.distancia >= 420 && evaluation.distancia < 520) { return 'Média'; }
        if (evaluation.distancia >= 520 && evaluation.distancia < 620) { return 'Boa'; }
        if (evaluation.distancia >= 620 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 40 && evaluation.idade < 50) {
        if (evaluation.distancia < 300) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 300 && evaluation.distancia < 380) { return 'Baixa'; }
        if (evaluation.distancia >= 380 && evaluation.distancia < 460) { return 'Média'; }
        if (evaluation.distancia >= 460 && evaluation.distancia < 580) { return 'Boa'; }
        if (evaluation.distancia >= 580 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 50) {
        if (evaluation.distancia < 260) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 260 && evaluation.distancia < 340) { return 'Baixa'; }
        if (evaluation.distancia >= 340 && evaluation.distancia < 420) { return 'Média'; }
        if (evaluation.distancia >= 420 && evaluation.distancia < 540) { return 'Boa'; }
        if (evaluation.distancia >= 540 ) { return 'Excelente'; }
      }
    }

    if (evaluation.sexo === 'M') {
      if (evaluation.idade < 30) {
        if (evaluation.distancia < 400) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 400 && evaluation.distancia < 500) { return 'Baixa'; }
        if (evaluation.distancia >= 500 && evaluation.distancia < 600) { return 'Média'; }
        if (evaluation.distancia >= 600 && evaluation.distancia < 700) { return 'Boa'; }
        if (evaluation.distancia >= 700 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 30 && evaluation.idade < 40) {
        if (evaluation.distancia < 380) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 380 && evaluation.distancia < 460) { return 'Baixa'; }
        if (evaluation.distancia >= 460 && evaluation.distancia < 560) { return 'Média'; }
        if (evaluation.distancia >= 560 && evaluation.distancia < 660) { return 'Boa'; }
        if (evaluation.distancia >= 660 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 40 && evaluation.idade < 50) {
        if (evaluation.distancia < 340) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 340 && evaluation.distancia < 420) { return 'Baixa'; }
        if (evaluation.distancia >= 420 && evaluation.distancia < 520) { return 'Média'; }
        if (evaluation.distancia >= 520 && evaluation.distancia < 620) { return 'Boa'; }
        if (evaluation.distancia >= 620 ) { return 'Excelente'; }
      }
      if (evaluation.idade >= 50) {
        if (evaluation.distancia < 320) { return 'Muito Baixa'; }
        if (evaluation.distancia >= 320 && evaluation.distancia < 400) { return 'Baixa'; }
        if (evaluation.distancia >= 400 && evaluation.distancia < 500) { return 'Média'; }
        if (evaluation.distancia >= 500 && evaluation.distancia < 600) { return 'Boa'; }
        if (evaluation.distancia >= 600 ) { return 'Excelente'; }
      }
    }
  }
  // Banco Katch
  getVO2OObtBancoKatch(evaluation) {
    if (evaluation.sexo === 'F') {
      return +(65.81 - 0.1487 * evaluation.fc);
    } else {
      return +(111.33 - 0.42 * evaluation.fc);
    }
  }

  // Banco YMCA 3 minutos
  getClassBancoYMCA(evaluation) {
    if (evaluation.sexo == 'M') {
      if (+evaluation.idade >= 18 && +evaluation.idade < 26) {
        if ( +evaluation.fc >= 70 && +evaluation.fc <= 78) { return 'Excelente'; }
        if ( +evaluation.fc >= 82 && +evaluation.fc <= 88) { return 'Boa'; }
        if ( +evaluation.fc >= 91 && +evaluation.fc <= 97) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 101 && +evaluation.fc <= 104) { return 'Média'; }
        if ( +evaluation.fc >= 107 && +evaluation.fc <= 114) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 118 && +evaluation.fc <= 126) { return 'Pobre'; }
        if ( +evaluation.fc >= 131 && +evaluation.fc <= 164) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 26 && +evaluation.idade < 36) {
        if ( +evaluation.fc >= 73 && +evaluation.fc <= 79) { return 'Excelente'; }
        if ( +evaluation.fc >= 83 && +evaluation.fc <= 88) { return 'Boa'; }
        if ( +evaluation.fc >= 91 && +evaluation.fc <= 97) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 101 && +evaluation.fc <= 106) { return 'Média'; }
        if ( +evaluation.fc >= 109 && +evaluation.fc <= 116) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 119 && +evaluation.fc <= 126) { return 'Pobre'; }
        if ( +evaluation.fc >= 130 && +evaluation.fc <= 164) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 36 && +evaluation.idade < 46) {
        if ( +evaluation.fc >= 72 && +evaluation.fc <= 82) { return 'Excelente'; }
        if ( +evaluation.fc >= 86 && +evaluation.fc <= 94) { return 'Boa'; }
        if ( +evaluation.fc >= 98 && +evaluation.fc <= 102) { return 'Acima da Média'; }
        if ( ++evaluation.fc >= 105 && ++evaluation.fc <= 111) { return 'Média'; }
        if ( +evaluation.fc >= 113 && +evaluation.fc <= 118) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 120 && +evaluation.fc <= 128) { return 'Pobre'; }
        if ( +evaluation.fc >= 132 && +evaluation.fc <= 163) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 46 && +evaluation.idade < 56) {
        if ( +evaluation.fc >= 78 && +evaluation.fc <= 84) { return 'Excelente'; }
        if ( +evaluation.fc >= 89 && +evaluation.fc <= 96) { return 'Boa'; }
        if ( +evaluation.fc >= 99 && +evaluation.fc <= 103) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 109 && +evaluation.fc <= 105) { return 'Média'; }
        if ( +evaluation.fc >= 118 && +evaluation.fc <= 121) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 124 && +evaluation.fc <= 130) { return 'Pobre'; }
        if ( +evaluation.fc >= 135 && +evaluation.fc <= 158) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 56 && +evaluation.idade < 66) {
        if ( +evaluation.fc >= 72 && +evaluation.fc <= 82) { return 'Excelente'; }
        if ( +evaluation.fc >= 89 && +evaluation.fc <= 97) { return 'Boa'; }
        if ( +evaluation.fc >= 98 && +evaluation.fc <= 101) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 105 && +evaluation.fc <= 111) { return 'Média'; }
        if ( +evaluation.fc >= 113 && +evaluation.fc <= 118) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 122 && +evaluation.fc <= 128) { return 'Pobre'; }
        if ( +evaluation.fc >= 131 && +evaluation.fc <= 150) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 66) {
        if ( +evaluation.fc >= 72 && +evaluation.fc <= 86) { return 'Excelente'; }
        if ( +evaluation.fc >= 89 && +evaluation.fc <= 95) { return 'Boa'; }
        if ( +evaluation.fc >= 97 && +evaluation.fc <= 102) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 104 && +evaluation.fc <= 113) { return 'Média'; }
        if ( +evaluation.fc >= 114 && +evaluation.fc <= 119) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 122 && +evaluation.fc <= 128) { return 'Pobre'; }
        if ( +evaluation.fc >= 133 && +evaluation.fc <= 152) { return 'Muito Pobre'; }
      }
    }
    if (evaluation.sexo == 'F') {
      if (+evaluation.idade >= 18 && +evaluation.idade < 26) {
        if ( +evaluation.fc >= 72 && +evaluation.fc <= 83) { return 'Excelente'; }
        if ( +evaluation.fc >= 88 && +evaluation.fc <= 97) { return 'Boa'; }
        if ( +evaluation.fc >= 100 && +evaluation.fc <= 106) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 110 && +evaluation.fc <= 116) { return 'Média'; }
        if ( +evaluation.fc >= 118 && +evaluation.fc <= 124) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 128 && +evaluation.fc <= 128) { return 'Pobre'; }
        if ( +evaluation.fc >= 142 && +evaluation.fc <= 155) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 26 && +evaluation.idade < 36) {
        if ( +evaluation.fc >= 72 && +evaluation.fc <= 79) { return 'Excelente'; }
        if ( +evaluation.fc >= 91 && +evaluation.fc <= 88) { return 'Boa'; }
        if ( +evaluation.fc >= 103 && +evaluation.fc <= 97) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 112 && +evaluation.fc <= 106) { return 'Média'; }
        if ( +evaluation.fc >= 121 && +evaluation.fc <= 116) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 129 && +evaluation.fc <= 126) { return 'Pobre'; }
        if ( +evaluation.fc >= 141 && +evaluation.fc <= 164) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 36 && +evaluation.idade < 46) {
        if ( +evaluation.fc >= 74 && +evaluation.fc <= 87) { return 'Excelente'; }
        if ( +evaluation.fc >= 93 && +evaluation.fc <= 101) { return 'Boa'; }
        if ( +evaluation.fc >= 104 && +evaluation.fc <= 109) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 110 && +evaluation.fc <= 117) { return 'Média'; }
        if ( +evaluation.fc >= 120 && +evaluation.fc <= 127) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 130 && +evaluation.fc <= 138) { return 'Pobre'; }
        if ( +evaluation.fc >= 143 && +evaluation.fc <= 152) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 46 && +evaluation.idade < 56) {
        if ( +evaluation.fc >= 76 && +evaluation.fc <= 93) { return 'Excelente'; }
        if ( +evaluation.fc >= 96 && +evaluation.fc <= 102) { return 'Boa'; }
        if ( +evaluation.fc >= 106 && +evaluation.fc <= 113) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 117 && +evaluation.fc <= 120) { return 'Média'; }
        if ( +evaluation.fc >= 121 && +evaluation.fc <= 126) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 127 && +evaluation.fc <= 133) { return 'Pobre'; }
        if ( +evaluation.fc >= 138 && +evaluation.fc <= 152) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 56 && +evaluation.idade < 66) {
        if ( +evaluation.fc >= 74 && +evaluation.fc <= 92) { return 'Excelente'; }
        if ( +evaluation.fc >= 97 && +evaluation.fc <= 103) { return 'Boa'; }
        if ( +evaluation.fc >= 106 && +evaluation.fc <= 111) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 113 && +evaluation.fc <= 117) { return 'Média'; }
        if ( +evaluation.fc >= 119 && +evaluation.fc <= 127) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 129 && +evaluation.fc <= 136) { return 'Pobre'; }
        if ( +evaluation.fc >= 142 && +evaluation.fc <= 151) { return 'Muito Pobre'; }
      }
      if (+evaluation.idade >= 66) {
        if ( +evaluation.fc >= 73 && +evaluation.fc <= 86) { return 'Excelente'; }
        if ( +evaluation.fc >= 93 && +evaluation.fc <= 100) { return 'Boa'; }
        if ( +evaluation.fc >= 104 && +evaluation.fc <= 114) { return 'Acima da Média'; }
        if ( +evaluation.fc >= 117 && +evaluation.fc <= 121) { return 'Média'; }
        if ( +evaluation.fc >= 123 && +evaluation.fc <= 127) { return 'Abaixo da Média'; }
        if ( +evaluation.fc >= 129 && +evaluation.fc <= 134) { return 'Pobre'; }
        if ( +evaluation.fc >= 135 && +evaluation.fc <= 151) { return 'Muito Pobre'; }
      }
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
