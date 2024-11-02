import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Emissor } from './model/emissor.model';
import { Cliente } from './model/cliente.model';
import { Orcamento } from './model/orcamento.model';
import { EmissorComponent } from "./components/emissor/emissor.component";
import { ClienteComponent } from "./components/cliente/cliente.component";
import { ProdutoComponent } from "./components/produto-servico/produto-servico.component";
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RelatorioComponent, EmissorComponent, ClienteComponent, ProdutoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Orcatech';
  logoUrl: string | ArrayBuffer | null = null;

  emissor: Emissor = {
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cnpj: ''
  };

  cliente: Cliente = {
    nome: '',
    endereco: '',
    telefone: '',
    email: ''
  };

  orcamento: Orcamento = {
    emissor: this.emissor,
    cliente: this.cliente,
    observacao: '',
    produtos: [],
    total: 0
  };

  produto: any = {}; // Inicialize o produto aqui

  // Método para gerar o PDF do orçamento
  gerarRelatorioPDF() {
    const doc = new jsPDF();
    
    // Adicionar o logo ao PDF
    if (this.logoUrl) {
      doc.addImage(this.logoUrl as string, 'JPEG', 10, 10, 50, 50); 
    }

    doc.setFontSize(18);
    doc.text('Orçamento', 10, 70); // Título do Relatório

    // Informações do Emissor
    doc.setFontSize(12);
    doc.text(`Emissor: ${this.emissor.nome}`, 10, 80);
    doc.text(`Telefone: ${this.emissor.telefone}`, 10, 90);
    doc.text(`Email: ${this.emissor.email}`, 10, 100);
    doc.text(`Endereço: ${this.emissor.endereco}`, 10, 110);
    doc.text(`CNPJ: ${this.emissor.cnpj}`, 10, 120);

    // Informações do Cliente
    doc.text(`Cliente: ${this.cliente.nome}`, 10, 140);
    doc.text(`Endereço: ${this.cliente.endereco}`, 10, 150);
    doc.text(`Telefone: ${this.cliente.telefone}`, 10, 160);
    doc.text(`Email: ${this.cliente.email}`, 10, 170);

    // Lista de Produtos
    let yPosition = 190;
    doc.text('Produtos:', 10, yPosition);
    this.orcamento.produtos.forEach((produto, index) => {
      yPosition += 10;
      doc.text(`${index + 1}. ${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$${produto.preco.toFixed(2)}`, 10, yPosition);
    });

    // Total do Orçamento
    yPosition += 20;
    doc.setFontSize(14);
    doc.text(`Total: R$${this.orcamento.total.toFixed(2)}`, 10, yPosition);

    // Observação
    yPosition += 20;
    doc.setFontSize(12);
    doc.text('Observação:', 10, yPosition);
    doc.text(this.orcamento.observacao, 10, yPosition + 10);

    // Salvar o PDF
    doc.save('orcamento.pdf');
  }

  // Método para salvar um produto
  salvarProduto() {
    console.log("Produto salvo:", this.produto);
    this.orcamento.produtos.push(this.produto);
    this.orcamento.total += this.produto.preco; // Atualiza o total
    this.produto = {}; // Limpa o produto após salvar
  }

  // Método para criar orçamento
  criarOrcamento() {
    console.log("Orçamento criado!");
    // Implementação adicional aqui
  }

  // Método para salvar o emissor
  salvarEmissor() {
    console.log("Emissor salvo:", this.emissor);
    // Implementação adicional aqui
  }

  // Método para salvar o cliente
  salvarCliente() {
    console.log("Cliente salvo:", this.cliente);
    // Implementação adicional aqui
  }

  // Método para lidar com a seleção do logo
  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result; // Armazena a URL do logo
      };
      reader.onerror = (error) => {
        console.error("Erro ao carregar o logo:", error);
      };
      reader.readAsDataURL(file);
    }
  }
}
