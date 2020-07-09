import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrepareChartService {

  constructor() { }

  getSingle1(proto) {
    return [{ name: 'Gordura atual: ' + proto.perGordura + '%', value: proto.perGordura },
    { name: 'Gordura em excesso: ' + proto.gorduraExcesso + '%', value: proto.gorduraExcesso },
    { name: 'Livre de gordura: ' + proto.percLivreGordura + '%', value: proto.percLivreGordura }
  /*   { name: 'Gordura desejada: ' + proto.gorduraDesejada + '%', value: proto.gorduraDesejada } */
    ];
  }

  getSingle2(proto) {
    return [{ name: 'Peso atual: ' + proto.pesoAtual + 'Kg' , value: proto.pesoAtual },
    { name: 'Peso sugerido: ' + proto.pesoSugerido + 'Kg', value: proto.pesoSugerido },
    { name: 'Peso em excesso: ' + proto.pesoExcesso + 'Kg', value: proto.pesoExcesso },
    { name: 'Peso ósseo: ' + proto.pesoOsseo + 'Kg', value: proto.pesoOsseo },
    { name: 'Peso residual: ' + proto.pesoResidual + 'Kg', value: proto.pesoResidual },
    { name: 'Peso muscular: ' + proto.pesoMuscular + 'Kg', value: proto.pesoMuscular }
    ];
  }
}
