import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmissorComponent } from './components/emissor/emissor.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProdutoComponent } from './components/produto-servico/produto-servico.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    EmissorComponent,
    ClienteComponent,
    ProdutoComponent,
    RelatorioComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Orcatech';
  step = 1;

  private readonly stepsRoutes = [
    '/emissor',
    '/cliente',
    '/produto-servico',
    '/orcamento',
    '/relatorio',
    '/dashboard'
  ];

  constructor(private router: Router) {}

  nextStep() {
    if (this.step < this.stepsRoutes.length) {
      this.step++;
      this.navigateToStep();
    } else {
      console.warn('Já está na última etapa.');
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.navigateToStep();
    } else {
      console.warn('Já está na primeira etapa.');
    }
  }

  navigateToStep() {
    if (this.step >= 1 && this.step <= this.stepsRoutes.length) {
      const route = this.stepsRoutes[this.step - 1];
      this.router.navigate([route]);
    } else {
      console.error(`Step ${this.step} não é válido!`);
    }
  }
}
