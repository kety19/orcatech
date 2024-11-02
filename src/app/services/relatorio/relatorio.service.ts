import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Orcamento } from '../../model/orcamento.model';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  constructor() {}

  gerarRelatorio(orcamento: Orcamento): void {
    const doc = new jsPDF();

    // Título do PDF
    doc.setFontSize(16);
    doc.text('Orçamento de Serviços - OrçaTech', 10, 10);

    // Informações do Emissor
    doc.setFontSize(12);
    doc.text('Informações do Emissor:', 10, 30);
    doc.text(`Nome: ${orcamento.emissor.nome || ''}`, 10, 40);
    doc.text(`Telefone: ${orcamento.emissor.telefone || ''}`, 10, 50);
    doc.text(`Email: ${orcamento.emissor.email || ''}`, 10, 60);
    doc.text(`Endereço: ${orcamento.emissor.endereco || ''}`, 10, 70);
    doc.text(`CNPJ: ${orcamento.emissor.cnpj || ''}`, 10, 80);

    // Informações do Cliente
    doc.text('Informações do Cliente:', 10, 100);
    doc.text(`Nome: ${orcamento.cliente.nome || ''}`, 10, 110);
    doc.text(`Telefone: ${orcamento.cliente.telefone || ''}`, 10, 120);
    doc.text(`Email: ${orcamento.cliente.email || ''}`, 10, 130);
    doc.text(`Endereço: ${orcamento.cliente.endereco || ''}`, 10, 140);

    // Descrição e Total do Orçamento
    doc.text('Descrição do Orçamento:', 10, 160);
    doc.text(orcamento.observacao || '', 10, 170);
    doc.text(`Total: R$ ${orcamento.total.toFixed(2)}`, 10, 180);

    // Adicionando lista de Produtos
    let yPosition = 200;
    doc.text('Produtos/Serviços:', 10, yPosition);
    yPosition += 10;

    orcamento.produtos.forEach((produto) => {
      doc.text(
        `${produto.nome || ''} - Quantidade: ${produto.quantidade || 1} - Preço: R$ ${produto.preco.toFixed(2)}`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    // Salva o PDF
    doc.save('orcamento.pdf');
  }
}