import { Component } from '@angular/core';
import { Orcamento } from '../../model/orcamento.model';
import { RelatorioService } from '../../services/relatorio/relatorio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./relatorio.component.scss'],
  standalone: true,
})
export class RelatorioComponent {
  logoUrl: string | ArrayBuffer | null = null;
  orcamento: Orcamento = {
    emissor: { nome: '', telefone: '', email: '', endereco: '', cnpj: '' },
    cliente: { nome: '', telefone: '', email: '', endereco: '' },
    produtos: [],
    total: 0,
    observacao: '',
    status: 'pendente'
  };

  constructor(private relatorioService: RelatorioService) {}

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result;
      };
      reader.onerror = (error) => {
        console.error('Erro ao carregar o logo:', error);
      };
      reader.readAsDataURL(file);
    }
  }

  gerarPDF(): void {
    this.relatorioService.gerarPDF(this.orcamento, this.logoUrl);
  }
}
