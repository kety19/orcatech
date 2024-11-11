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

    // título do PDF
    doc.setFontSize(16);
    doc.text('Orçamento de Serviços - OrçaTech', 10, 10);

    //  emissor
    doc.setFontSize(12);
    doc.text('Informações do Emissor:', 10, 20);
    doc.text(`Nome: ${orcamento.emissor.nome || ''}`, 10, 30);
    doc.text(`Telefone: ${orcamento.emissor.telefone || ''}`, 10, 40);
    doc.text(`Email: ${orcamento.emissor.email || ''}`, 10, 50);
    doc.text(`Endereço: ${orcamento.emissor.endereco || ''}`, 10, 60);
    doc.text(`CNPJ: ${orcamento.emissor.cnpj || ''}`, 10, 70);

    // cliente
    doc.text('Informações do Cliente:', 10, 90);
    doc.text(`Nome: ${orcamento.cliente.nome || ''}`, 10, 100);
    doc.text(`Telefone: ${orcamento.cliente.telefone || ''}`, 10, 110);
    doc.text(`Email: ${orcamento.cliente.email || ''}`, 10, 120);
    doc.text(`Endereço: ${orcamento.cliente.endereco || ''}`, 10, 130);

    // descrição e total do orçamento
    doc.text('Descrição do Orçamento:', 10, 150);
    doc.text(orcamento.observacao || '', 10, 160);
    doc.text(`Total: R$ ${orcamento.total.toFixed(2)}`, 10, 170);

    // adicionando lista de produtos
    let yPosition = 180;
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

    
    doc.save('orcamento.pdf');
  }
}
