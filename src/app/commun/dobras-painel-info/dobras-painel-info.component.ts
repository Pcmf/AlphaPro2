import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dobras-painel-info',
  templateUrl: './dobras-painel-info.component.html',
  styleUrls: ['./dobras-painel-info.component.scss']
})
export class DobrasPainelInfoComponent implements OnInit {
  @Input() pesos: any = [];

  pesoAtual: number;
  pesoSugerido: number;
  pesoExcesso: number;
  locale: string;

  constructor(
    private dataService: DataService
  ) {
    this.locale = this.dataService.getCountryId();
   }

  ngOnInit(): void {
    this.pesoAtual = this.pesos.pesoAtual;
    this.pesoSugerido = this.pesos.pesoSugerido;
    this.pesoExcesso = this.pesos.pesoExcesso;
  }

}
