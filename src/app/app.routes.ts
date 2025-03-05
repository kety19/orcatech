import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmissorComponent } from './components/emissor/emissor.component';
import { OrcamentoComponent } from './components/orcamento/orcamento.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { ProdutoComponent } from './components/produto-servico/produto-servico.component';
import { ClienteComponent } from './components/cliente/cliente.component';

export const routes: Routes = [
  { path: 'emissor', component: EmissorComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'produto-servico', component: ProdutoComponent },
  { path: 'orcamento', component: OrcamentoComponent }, 
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/emissor', pathMatch: 'full' }
]