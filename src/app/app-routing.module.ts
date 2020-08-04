import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { DashComponent } from './dashboard/dash/dash.component';
import { NewComponent } from './register/new/new.component';
import { PreDashComponent } from './prescription/pre-dash/pre-dash.component';
import { AvDashComponent } from './avaliation/av-dash/av-dash.component';
import { RepDashComponent } from './reports/rep-dash/rep-dash.component';
import { AnameneseComponent } from './avaliation/anamenese/anamenese.component';
import { QPAFComponent } from './avaliation/risco/qpaf/qpaf.component';
import { RDDCComponent } from './avaliation/risco/rddc/rddc.component';
import { RDCComponent } from './avaliation/risco/rdc/rdc.component';
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
import { GoniometroComponent } from './avaliation/flexibilidade/goniometro/goniometro.component';
import { FleximetroComponent } from './avaliation/flexibilidade/fleximetro/fleximetro.component';
import { FlexitesteComponent } from './avaliation/flexibilidade/flexiteste/flexiteste.component';
import { BancoWellsDillonComponent } from './avaliation/flexibilidade/banco-wells-dillon/banco-wells-dillon.component';
import { FRMComponent } from './avaliation/frm/frm.component';
import { RockportComponent } from './avaliation/CardioPulmunar/rockport/rockport.component';
import { UKKComponent } from './avaliation/CardioPulmunar/ukk/ukk.component';
import { CuretonComponent } from './avaliation/CardioPulmunar/cureton/cureton.component';
import { TesteCaminhadaComponent } from './avaliation/CardioPulmunar/teste-caminhada/teste-caminhada.component';
import { TesteCorridaComponent } from './avaliation/CardioPulmunar/teste-corrida/teste-corrida.component';
import { TesteBicicletaComponent } from './avaliation/CardioPulmunar/teste-bicicleta/teste-bicicleta.component';
import { CooperComponent } from './avaliation/CardioPulmunar/cooper/cooper.component';
import { GeorgeComponent } from './avaliation/CardioPulmunar/george/george.component';
import { AstrandRyhmingComponent } from './avaliation/CardioPulmunar/astrand-ryhming/astrand-ryhming.component';
import { YMCAComponent } from './avaliation/CardioPulmunar/ymca/ymca.component';
import { BancoComponent } from './avaliation/CardioPulmunar/banco/banco.component';
import { NatacaoComponent } from './avaliation/CardioPulmunar/natacao/natacao.component';
import { George2Component } from './avaliation/CardioPulmunar/george2/george2.component';
import { BalkeWareComponent } from './avaliation/CardioPulmunar/balke-ware/balke-ware.component';
import { ComponentePosturalComponent } from './avaliation/componente-postural/componente-postural.component';
import { IRCQComponent } from './avaliation/componente-morfologica/ircq/ircq.component';
import { StComponent } from './avaliation/componente-morfologica/st/st.component';
import { ScanerComponent } from './avaliation/composicao-corporal/scaner/scaner.component';
import { DEXAComponent } from './avaliation/composicao-corporal/dexa/dexa.component';
import { WeltmanSeipTranComponent } from './avaliation/antropometria/weltman-seip-tran/weltman-seip-tran.component';
import { MayhewEtAlComponent } from './avaliation/antropometria/mayhew-et-al/mayhew-et-al.component';
import { IndiceConicidadeComponent } from './avaliation/componente-morfologica/indice-conicidade/indice-conicidade.component';
import { AllDobrasComponent } from './avaliation/dobras/all-dobras/all-dobras.component';
import { Faulkner4Component } from './avaliation/dobras/faulkner4/faulkner4.component';
import { TestePiscinaComponent } from './avaliation/CardioPulmunar/teste-piscina/teste-piscina.component';
import { TesteBancoComponent } from './avaliation/CardioPulmunar/teste-banco/teste-banco.component';
import { YmcaBancoComponent } from './avaliation/CardioPulmunar/ymca-banco/ymca-banco.component';
import { VogelComponent } from './avaliation/antropometria/vogel/vogel.component';
import { WeltmanEtAlComponent } from './avaliation/antropometria/weltman-et-al/weltman-et-al.component';
import { ConfigsComponent } from './dashboard/configs/configs.component';
import { VideoComponent } from './commun/video/video.component';
import { MetronomeComponent } from './commun/metronome/metronome.component';
import { AuthGuardService } from './services/auth-guard-service.service';


const routes: Routes = [
// Morfologico - dobras e outros protocolos
  {path: 'slau', component: SlaugtherComponent, canActivate: [AuthGuardService] },
  {path: 'jp3', component: JP3Component, canActivate: [AuthGuardService] },
  {path: 'dw4', component: DW4Component, canActivate: [AuthGuardService] },
  {path: 'sloan2', component: SloanComponent, canActivate: [AuthGuardService] },
  {path: 'guedes3', component: GuedesComponent, canActivate: [AuthGuardService] },
  {path: 'pb4', component: PB4Component, canActivate: [AuthGuardService] },
  {path: 'faulkner', component: Faulkner4Component, canActivate: [AuthGuardService] },
  {path: 'jp7', component: JP7Component, canActivate: [AuthGuardService] },
  {path: 'wb2', component: WB2Component, canActivate: [AuthGuardService] },
  {path: 'wb3', component: WB3Component, canActivate: [AuthGuardService] },
  {path: 'will', component: WillComponent, canActivate: [AuthGuardService] },
  {path: 'all', component: AllDobrasComponent, canActivate: [AuthGuardService] },

  {path: 'balanca', component: BalancaComponent, canActivate: [AuthGuardService] },
  {path: 'scaner', component: ScanerComponent, canActivate: [AuthGuardService] },
  {path: 'dexa', component: DEXAComponent, canActivate: [AuthGuardService] },
// Antropometria
  {path: 'vogel', component: VogelComponent, canActivate: [AuthGuardService] },
  {path: 'weltal', component: WeltmanEtAlComponent, canActivate: [AuthGuardService] },
  {path: 'tw', component: TranWeltmanComponent, canActivate: [AuthGuardService] },
  {path: 'wst', component: WeltmanSeipTranComponent, canActivate: [AuthGuardService] },
  {path: 'metal', component: MayhewEtAlComponent, canActivate: [AuthGuardService] },
  {path: 'welt', component: WeltmanComponent, canActivate: [AuthGuardService] },
// Flexidade
  {path: 'flex', component: FlexDashComponent, canActivate: [AuthGuardService] },
  {path: 'frc', component: WeltmanComponent, canActivate: [AuthGuardService] },
  {path: 'goniometro', component: GoniometroComponent, canActivate: [AuthGuardService] },
  {path: 'fleximetro', component: FleximetroComponent, canActivate: [AuthGuardService] },
  {path: 'flexiteste', component: FlexitesteComponent, canActivate: [AuthGuardService] },
  {path: 'bwd', component: BancoWellsDillonComponent, canActivate: [AuthGuardService] },
  {path: 'frm', component: FRMComponent, canActivate: [AuthGuardService] },
// Aerobicos
  {path: 'tcam', component: TesteCaminhadaComponent, canActivate: [AuthGuardService] },
  {path: 'tcorr', component: TesteCorridaComponent, canActivate: [AuthGuardService] },
  {path: 'tbic', component: TesteBicicletaComponent, canActivate: [AuthGuardService] },
  {path: 'tpiscina', component: TestePiscinaComponent, canActivate: [AuthGuardService] },
  {path: 'tbanco', component: TesteBancoComponent, canActivate: [AuthGuardService] },
  {path: 'rock', component: RockportComponent, canActivate: [AuthGuardService] },
  {path: 'ukk', component: UKKComponent, canActivate: [AuthGuardService] },
  {path: 'cureton', component: CuretonComponent, canActivate: [AuthGuardService] },
  {path: 'cooper', component: CooperComponent, canActivate: [AuthGuardService] },
  {path: 'george2', component: George2Component, canActivate: [AuthGuardService] },
  {path: 'george', component: GeorgeComponent, canActivate: [AuthGuardService] },
  {path: 'astryh', component: AstrandRyhmingComponent, canActivate: [AuthGuardService] },
  {path: 'balke', component: BalkeWareComponent, canActivate: [AuthGuardService] },
  {path: 'ymca', component: YMCAComponent, canActivate: [AuthGuardService] },
  {path: 'bancoymca', component: YmcaBancoComponent, canActivate: [AuthGuardService] },
  {path: 'banco', component: BancoComponent, canActivate: [AuthGuardService] },
  {path: 'natacao', component: NatacaoComponent, canActivate: [AuthGuardService] },

  // outros
  {path: 'video/:video', component: VideoComponent, canActivate: [AuthGuardService] },
  {path: 'metro', component: MetronomeComponent, canActivate: [AuthGuardService] },
  {path: 'pdc', component: PDCComponent, canActivate: [AuthGuardService] },
  {path: 'cpost', component: ComponentePosturalComponent, canActivate: [AuthGuardService] },
  {path: 'cc', component: CCComponent, canActivate: [AuthGuardService] },
  {path: 'imc', component: IMComponent, canActivate: [AuthGuardService] },
  {path: 'ic', component: IndiceConicidadeComponent, canActivate: [AuthGuardService] },
  {path: 'ircq', component: IRCQComponent, canActivate: [AuthGuardService] },
  {path: 'st', component: StComponent, canActivate: [AuthGuardService] },
  {path: 'rddc', component: RDDCComponent, canActivate: [AuthGuardService] },
  {path: 'rdc', component: RDCComponent, canActivate: [AuthGuardService] },
  {path: 'qpaf', component: QPAFComponent, canActivate: [AuthGuardService] },
  {path: 'anamn', component: AnameneseComponent, canActivate: [AuthGuardService] },
  {path: 'repDash', component: RepDashComponent, canActivate: [AuthGuardService] },
  {path: 'avDash', component: AvDashComponent, canActivate: [AuthGuardService] },
  {path: 'preDash', component: PreDashComponent, canActivate: [AuthGuardService] },
  {path: 'eval' , component: EvaluationComponent , canActivate: [AuthGuardService] },
  {path: 'configs' , component: ConfigsComponent, canActivate: [AuthGuardService] },
  {path: 'new' , component: NewComponent , canActivate: [AuthGuardService] },
  {path: 'dash' , component: DashComponent , canActivate: [AuthGuardService] },
  {path: '**' , component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
