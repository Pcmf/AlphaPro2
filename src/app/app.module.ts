import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatModulesImports } from './MatModulesImport';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatVideoModule } from 'mat-video';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {WebcamModule} from 'ngx-webcam';

import { DataService } from './services/data.service';
import { MenuComponent } from './commun/menu/menu.component';
import { LoginComponent } from './login/login/login.component';
import { DashComponent } from './dashboard/dash/dash.component';
import { NewComponent } from './register/new/new.component';
import { AnameneseComponent, DialogHelp } from './avaliation/anamenese/anamenese.component';
import { AvDashComponent } from './avaliation/av-dash/av-dash.component';
import { PreDashComponent } from './prescription/pre-dash/pre-dash.component';
import { RepDashComponent } from './reports/rep-dash/rep-dash.component';
import { DateFormat } from './date-format';
import { QPAFComponent } from './avaliation/risco/qpaf/qpaf.component';
import { RDCComponent } from './avaliation/risco/rdc/rdc.component';
import { RDDCComponent } from './avaliation/risco/rddc/rddc.component';
import { PDCComponent } from './avaliation/componente-morfologica/pdc/pdc.component';
import { CCComponent } from './avaliation/composicao-corporal/cc.component';
import { IMComponent } from './avaliation/componente-morfologica/im/im.component';
import { EvaluationComponent } from './avaliation/evaluation/evaluation.component';
import { SlaugtherComponent } from './avaliation/dobras/slaugther/slaugther.component';
import { JP3Component } from './avaliation/dobras/jp3/jp3.component';
import { DW4Component } from './avaliation/dobras/dw4/dw4.component';
import { SloanComponent } from './avaliation/dobras/sloan/sloan.component';
import { GuedesComponent } from './avaliation/dobras/guedes/guedes.component';
import { PB4Component } from './avaliation/dobras/pb4/pb4.component';
import { JP7Component } from './avaliation/dobras/jp7/jp7.component';
import { WB2Component } from './avaliation/dobras/wb2/wb2.component';
import { WB3Component } from './avaliation/dobras/wb3/wb3.component';
import { WillComponent } from './avaliation/dobras/will/will.component';
import { BalancaComponent } from './avaliation/composicao-corporal/balanca/balanca.component';
import { TranWeltmanComponent } from './avaliation/antropometria/tran-weltman/tran-weltman.component';
import { WeltmanComponent } from './avaliation/antropometria/weltman/weltman.component';
import { FlexDashComponent } from './avaliation/flexibilidade/flex-dash/flex-dash.component';
import { BancoWellsDillonComponent } from './avaliation/flexibilidade/banco-wells-dillon/banco-wells-dillon.component';
import { GoniometroComponent } from './avaliation/flexibilidade/goniometro/goniometro.component';
import { FleximetroComponent } from './avaliation/flexibilidade/fleximetro/fleximetro.component';
import { FlexitesteComponent } from './avaliation/flexibilidade/flexiteste/flexiteste.component';
import { FRMComponent } from './avaliation/frm/frm.component';
import { TesteCaminhadaComponent } from './avaliation/CardioPulmunar/teste-caminhada/teste-caminhada.component';
import { TesteCorridaComponent } from './avaliation/CardioPulmunar/teste-corrida/teste-corrida.component';
import { TesteBicicletaComponent } from './avaliation/CardioPulmunar/teste-bicicleta/teste-bicicleta.component';
import { RockportComponent } from './avaliation/CardioPulmunar/rockport/rockport.component';
import { UKKComponent } from './avaliation/CardioPulmunar/ukk/ukk.component';
import { CuretonComponent } from './avaliation/CardioPulmunar/cureton/cureton.component';
import { CooperComponent } from './avaliation/CardioPulmunar/cooper/cooper.component';
import { George2Component } from './avaliation/CardioPulmunar/george2/george2.component';
import { GeorgeComponent } from './avaliation/CardioPulmunar/george/george.component';
import { AstrandRyhmingComponent } from './avaliation/CardioPulmunar/astrand-ryhming/astrand-ryhming.component';
import { BalkeWareComponent } from './avaliation/CardioPulmunar/balke-ware/balke-ware.component';
import { YMCAComponent } from './avaliation/CardioPulmunar/ymca/ymca.component';
import { BancoComponent } from './avaliation/CardioPulmunar/banco/banco.component';
import { NatacaoComponent } from './avaliation/CardioPulmunar/natacao/natacao.component';
import { AgeService } from './services/age.service';
import { ComponentePosturalComponent } from './avaliation/componente-postural/componente-postural.component';
import { IRCQComponent } from './avaliation/componente-morfologica/ircq/ircq.component';
import { StComponent } from './avaliation/componente-morfologica/st/st.component';
import { ScanerComponent } from './avaliation/composicao-corporal/scaner/scaner.component';
import { DEXAComponent } from './avaliation/composicao-corporal/dexa/dexa.component';
import { ProtcolosDobrasService } from './services/protcolos-dobras.service';
import { ChartDobrasComponent } from './commun/chart-dobras/chart-dobras.component';
import { PrepareChartService } from './services/prepare-chart.service';
import { ChartPieComponent } from './commun/chart-pie/chart-pie.component';
import { MayhewEtAlComponent } from './avaliation/antropometria/mayhew-et-al/mayhew-et-al.component';
import { WeltmanSeipTranComponent } from './avaliation/antropometria/weltman-seip-tran/weltman-seip-tran.component';
import { FlexClassComponent } from './commun/flex-class/flex-class.component';
import { IndiceConicidadeComponent } from './avaliation/componente-morfologica/indice-conicidade/indice-conicidade.component';
import { ChartCompareComponent } from './commun/chart-compare/chart-compare.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AllDobrasComponent } from './avaliation/dobras/all-dobras/all-dobras.component';
import { DialogMedidas } from './services/dialogs/dialog-medidas.component';
import { DialogService } from './services/dialog.service';
import { DialogHelpComponent } from './services/dialogs/dialog-help/dialog-help.component';
import { ChartCardioComponent } from './commun/chart-cardio/chart-cardio.component';
import { Faulkner4Component } from './avaliation/dobras/faulkner4/faulkner4.component';
import { TestePiscinaComponent } from './avaliation/CardioPulmunar/teste-piscina/teste-piscina.component';
import { TesteBancoComponent } from './avaliation/CardioPulmunar/teste-banco/teste-banco.component';
import { ProtocolosCardioService } from './services/protocolos-cardio.service';
import { DialogCardioComponent } from './services/dialogs/dialog-cardio/dialog-cardio.component';
import { YmcaBancoComponent } from './avaliation/CardioPulmunar/ymca-banco/ymca-banco.component';
import { VogelComponent } from './avaliation/antropometria/vogel/vogel.component';
import { WeltmanEtAlComponent } from './avaliation/antropometria/weltman-et-al/weltman-et-al.component';
import { TimePipe } from './commun/time.pipe';
import { MetronomeComponent } from './commun/metronome/metronome.component';


export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });

    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    DashComponent,
    NewComponent,
    AnameneseComponent,
    AvDashComponent,
    PreDashComponent,
    RepDashComponent,
    QPAFComponent,
    RDCComponent,
    RDDCComponent,
    PDCComponent,
    CCComponent,
    IMComponent,
    EvaluationComponent,
    SlaugtherComponent,
    JP3Component,
    DW4Component,
    SloanComponent,
    GuedesComponent,
    PB4Component,
    JP7Component,
    WB2Component,
    WB3Component,
    WillComponent,
    BalancaComponent,
    TranWeltmanComponent,
    WeltmanComponent,
    FlexDashComponent,
    BancoWellsDillonComponent,
    GoniometroComponent,
    FleximetroComponent,
    FlexitesteComponent,
    FRMComponent,
    TesteCaminhadaComponent,
    TesteCorridaComponent,
    TesteBicicletaComponent,
    RockportComponent,
    UKKComponent,
    CuretonComponent,
    CooperComponent,
    George2Component,
    GeorgeComponent,
    AstrandRyhmingComponent,
    BalkeWareComponent,
    YMCAComponent,
    BancoComponent,
    NatacaoComponent,
    ComponentePosturalComponent,
    IRCQComponent,
    StComponent,
    ScanerComponent,
    DEXAComponent,
    ChartDobrasComponent,
    ChartPieComponent,
    MayhewEtAlComponent,
    WeltmanSeipTranComponent,
    FlexClassComponent,
    IndiceConicidadeComponent,
    ChartCompareComponent,
    DialogHelp,
    AllDobrasComponent,
    DialogMedidas,
    DialogHelpComponent,
    ChartCardioComponent,
    Faulkner4Component,
    TestePiscinaComponent,
    TesteBancoComponent,
    DialogCardioComponent,
    YmcaBancoComponent,
    VogelComponent,
    WeltmanEtAlComponent,
    TimePipe,
    MetronomeComponent
  ],
  imports: [
    BrowserModule,
    MatModulesImports,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatVideoModule,
    FormsModule,
    NgxChartsModule,
    HammerModule,
    WebcamModule,
    NgxMaskModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    DialogHelp,
    DialogMedidas
  ],
  providers: [DataService,
              {provide: LocationStrategy, useClass: HashLocationStrategy},
              { provide: DateAdapter, useClass: DateFormat },
              DatePipe,
              {
                provide: HAMMER_GESTURE_CONFIG,
                useClass: MyHammerConfig,
              },
              {
                provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
              },
              AgeService,
              ProtcolosDobrasService,
              ProtocolosCardioService,
              PrepareChartService,
              DialogService
            ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('pt-PT'); // DD/MM/YYYY
  }
 }
