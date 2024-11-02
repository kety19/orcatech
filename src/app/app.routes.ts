import { Routes } from '@angular/router';
import { EmissorComponent } from './components/emissor/emissor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { OrcamentoComponent } from './components/orcamento/orcamento.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

export const routes: Routes = [
  { path: 'emissor', component: EmissorComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: '', redirectTo: 'orcamento', pathMatch: 'full' }, // Redireciona para a rota do OrcamentoComponent
  { path: '**', redirectTo: 'orcamento', pathMatch: 'full' } // Rota para redirecionar caso o caminho não exista
];
