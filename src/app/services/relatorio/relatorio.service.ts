import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Orcamento } from '../../model/orcamento.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  gerarPDF(orcamento: Orcamento, logoUrl: string | ArrayBuffer | null): void {
    const doc = new jsPDF();

    // Adiciona logo ao PDF
    if (logoUrl) {
      doc.addImage(logoUrl as string, 'JPEG', 10, 10, 50, 50);
    }

    doc.setFontSize(18);
    doc.text('Orçamento', 10, 70);
    doc.setFontSize(12);

    // Adiciona informações ao PDF
    this.addEmissorInfoToPDF(doc, orcamento);
    this.addClienteInfoToPDF(doc, orcamento);
    this.addProdutosToPDF(doc, orcamento);
    this.addTotalAndObservacaoToPDF(doc, orcamento);

    // Salva o PDF
    doc.save('orcamento.pdf');
  }

  private addEmissorInfoToPDF(doc: jsPDF, orcamento: Orcamento) {
    doc.text(`Emissor: ${orcamento.emissor.nome || ''}`, 10, 80);
    doc.text(`Telefone: ${orcamento.emissor.telefone || ''}`, 10, 90);
    doc.text(`Email: ${orcamento.emissor.email || ''}`, 10, 100);
    doc.text(`Endereço: ${orcamento.emissor.endereco || ''}`, 10, 110);
    doc.text(`CNPJ: ${orcamento.emissor.cnpj || ''}`, 10, 120);
  }

  private addClienteInfoToPDF(doc: jsPDF, orcamento: Orcamento) {
    doc.text(`Cliente: ${orcamento.cliente.nome || ''}`, 10, 140);
    doc.text(`Endereço: ${orcamento.cliente.endereco || ''}`, 10, 150);
    doc.text(`Telefone: ${orcamento.cliente.telefone || ''}`, 10, 160);
    doc.text(`Email: ${orcamento.cliente.email || ''}`, 10, 170);
  }

  private addProdutosToPDF(doc: jsPDF, orcamento: Orcamento) {
    let yPosition = 190;
    doc.text('Produtos:', 10, yPosition);
    orcamento.produtos.forEach((produto, index) => {
      yPosition += 10;
      doc.text(
        `${index + 1}. ${produto.descricao || ''} - Quantidade: ${
          produto.quantidade
        } - Preço: R$${produto.preco.toFixed(2)}`,
        10,
        yPosition
      );
    });
  }

  private addTotalAndObservacaoToPDF(doc: jsPDF, orcamento: Orcamento) {
    let yPosition = 210 + orcamento.produtos.length * 10;
    doc.setFontSize(14);
    doc.text(`Total: R$${orcamento.total.toFixed(2)}`, 10, yPosition);
    yPosition += 20;
    doc.setFontSize(12);
    doc.text('Observação:', 10, yPosition);
    doc.text(orcamento.observacao || '', 10, yPosition + 10);
  }
}
