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
import { CarterComponent } from './avaliation/dobras/carter/carter.component';
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
import { TesteOutrosComponent } from './avaliation/CardioPulmunar/teste-outros/teste-outros.component';
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


const routes: Routes = [
// Morfologico - dobras e outros protocolos
  {path: 'slau', component: SlaugtherComponent},
  {path: 'jp3', component: JP3Component},
  {path: 'dw4', component: DW4Component},
  {path: 'sloan2', component: SloanComponent},
  {path: 'guedes3', component: GuedesComponent},
  {path: 'pb4', component: PB4Component},
  {path: 'carter', component: CarterComponent},
  {path: 'jp7', component: JP7Component},
  {path: 'wb2', component: WB2Component},
  {path: 'wb3', component: WB3Component},
  {path: 'will', component: WillComponent},
  {path: 'all', component: AllDobrasComponent},

  {path: 'balanca', component: BalancaComponent},
  {path: 'scaner', component: ScanerComponent},
  {path: 'dexa', component: DEXAComponent},

  {path: 'tw', component: TranWeltmanComponent},
  {path: 'wst', component: WeltmanSeipTranComponent},
  {path: 'metal', component: MayhewEtAlComponent},
  {path: 'welt', component: WeltmanComponent},
// Flexidade
  {path: 'flex', component: FlexDashComponent},
  {path: 'frc', component: WeltmanComponent},
  {path: 'goniometro', component: GoniometroComponent},
  {path: 'fleximetro', component: FleximetroComponent},
  {path: 'flexiteste', component: FlexitesteComponent},
  {path: 'bwd', component: BancoWellsDillonComponent},
  {path: 'frm', component: FRMComponent},
// Aerobicos
  {path: 'tcam', component: TesteCaminhadaComponent},
  {path: 'tcorr', component: TesteCorridaComponent},
  {path: 'tbic', component: TesteBicicletaComponent},
  {path: 'toutros', component: TesteOutrosComponent},
  {path: 'rock', component: RockportComponent},
  {path: 'ukk', component: UKKComponent},
  {path: 'cureton', component: CuretonComponent},
  {path: 'cooper', component: CooperComponent},
  {path: 'george2', component: George2Component},
  {path: 'george', component: GeorgeComponent},
  {path: 'astryh', component: AstrandRyhmingComponent},
  {path: 'balke', component: BalkeWareComponent},
  {path: 'ymca', component: YMCAComponent},
  {path: 'banco', component: BancoComponent},
  {path: 'natacao', component: NatacaoComponent},

  // outros
  {path: 'pdc', component: PDCComponent},
  {path: 'cpost', component: ComponentePosturalComponent},
  {path: 'cc', component: CCComponent},
  {path: 'imc', component: IMComponent},
  {path: 'ic', component: IndiceConicidadeComponent},
  {path: 'ircq', component: IRCQComponent},
  {path: 'st', component: StComponent},
  {path: 'rddc', component: RDDCComponent},
  {path: 'rdc', component: RDCComponent},
  {path: 'qpaf', component: QPAFComponent},
  {path: 'anamn', component: AnameneseComponent},
  {path: 'repDash', component: RepDashComponent},
  {path: 'avDash', component: AvDashComponent},
  {path: 'preDash', component: PreDashComponent},
  {path: 'eval' , component: EvaluationComponent },
  {path: 'new' , component: NewComponent },
  {path: 'dash' , component: DashComponent },
  {path: '**' , component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
