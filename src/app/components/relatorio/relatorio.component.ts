import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento/orcamento.service';
import { RelatorioService } from '../../services/relatorio/relatorio.service';
import { Orcamento } from '../../model/orcamento.model';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
})
export class RelatorioComponent {
  @ViewChild('relatorioContent', { static: false }) el!: ElementRef;

  constructor(
    private orcamentoService: OrcamentoService,
    private relatorioService: RelatorioService
  ) {}

  gerarRelatorio() {
    const orcamento: Orcamento | null = this.orcamentoService.getOrcamento();
  
    if (orcamento) {
      console.log("Orçamento encontrado:", orcamento);
      this.relatorioService.gerarRelatorio(orcamento);
    } else {
      console.error("Orçamento não encontrado. Não é possível gerar o relatório.");
    }
  }
}