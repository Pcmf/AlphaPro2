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
import { DeurembergComponent } from './avaliation/antropometria/deuremberg/deuremberg.component';
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


const routes: Routes = [

  {path: 'slau/:id', component: SlaugtherComponent},
  {path: 'jp3/:id', component: JP3Component},
  {path: 'dw4/:id', component: DW4Component},
  {path: 'sloan2/:id', component: SloanComponent},
  {path: 'guedes3/:id', component: GuedesComponent},
  {path: 'pb4/:id', component: PB4Component},
  {path: 'carter/:id', component: CarterComponent},
  {path: 'jp7/:id', component: JP7Component},
  {path: 'wb2/:id', component: WB2Component},
  {path: 'wb3/:id', component: WB3Component},
  {path: 'will/:id', component: WillComponent},

  {path: 'balanca/:id', component: BalancaComponent},
  {path: 'scaner/:id', component: ScanerComponent},
  {path: 'dexa/:id', component: DEXAComponent},

  {path: 'tw/:id', component: TranWeltmanComponent},
  {path: 'deur/:id', component: DeurembergComponent},
  {path: 'welt/:id', component: WeltmanComponent},

  {path: 'flex/:id', component: FlexDashComponent},
  {path: 'frc/:id', component: WeltmanComponent},
  {path: 'goniometro/:id', component: GoniometroComponent},
  {path: 'fleximetro/:id', component: FleximetroComponent},
  {path: 'flexiteste/:id', component: FlexitesteComponent},
  {path: 'bwd/:id', component: BancoWellsDillonComponent},
  {path: 'frm/:id', component: FRMComponent},

  {path: 'tcam/:id', component: TesteCaminhadaComponent},
  {path: 'tcorr/:id', component: TesteCorridaComponent},
  {path: 'tbic/:id', component: TesteBicicletaComponent},
  {path: 'toutros/:id', component: TesteOutrosComponent},
  {path: 'rock/:id', component: RockportComponent},
  {path: 'ukk/:id', component: UKKComponent},
  {path: 'cureton/:id', component: CuretonComponent},
  {path: 'cooper/:id', component: CooperComponent},
  {path: 'george2/:id', component: George2Component},
  {path: 'george/:id', component: GeorgeComponent},
  {path: 'astryh/:id', component: AstrandRyhmingComponent},
  {path: 'balke/:id', component: BalkeWareComponent},
  {path: 'ymca/:id', component: YMCAComponent},
  {path: 'banco/:id', component: BancoComponent},
  {path: 'natacao/:id', component: NatacaoComponent},




  {path: 'pdc/:id', component: PDCComponent},
  {path: 'cpost/:id', component: ComponentePosturalComponent},
  {path: 'cc/:id', component: CCComponent},
  {path: 'imc/:id', component: IMComponent},
  {path: 'ircq/:id', component: IRCQComponent},
  {path: 'st/:id', component: StComponent},
  {path: 'rddc/:id', component: RDDCComponent},
  {path: 'rdc/:id', component: RDCComponent},
  {path: 'qpaf/:id', component: QPAFComponent},
  {path: 'anamn/:id', component: AnameneseComponent},
  {path: 'repDash/:id', component: RepDashComponent},
  {path: 'avDash/:id', component: AvDashComponent},
  {path: 'preDash/:id', component: PreDashComponent},
  {path: 'eval/:id' , component: EvaluationComponent },
  {path: 'new/:id' , component: NewComponent },
  {path: 'new' , component: NewComponent },
  {path: 'dash' , component: DashComponent },
  {path: '**' , component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
