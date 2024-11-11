import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Emissor } from './model/emissor.model';
import { Cliente } from './model/cliente.model';
import { Orcamento } from './model/orcamento.model';
import { EmissorComponent } from "./components/emissor/emissor.component";
import { ClienteComponent } from "./components/cliente/cliente.component";
import { ProdutoComponent } from "./components/produto-servico/produto-servico.component";
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RelatorioComponent,
    EmissorComponent,
    ClienteComponent,
    ProdutoComponent,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Orcatech';
  logoUrl: string | ArrayBuffer | null = null;
  alertMessage: string = '';


  emissorForm: FormGroup;
  clienteForm: FormGroup;
  produtoForm: FormGroup;

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
    total: 0,
    status: 'nao vendido' 
  };

  orcamentos: Orcamento[] = [];
  dashboard = {
    total: 0,
    vendidos: 0,
    naoVendidos: 0
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.emissorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]]
    });

    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.orcamento = {
      emissor: { nome: '', telefone: '', email: '', endereco: '', cnpj: '' },
      cliente: { nome: '', endereco: '', telefone: '', email: '' },
      observacao: '',
      produtos: [],
      total: 0,
      status: 'nao vendido' 
    };
  }


  showConfirmation(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top', //posição da mensagem
      horizontalPosition: 'center' 
    });
  }

  ngOnInit() {
    this.carregarOrcamentos();
    this.atualizarDashboard();
  }

  
  // gera PDF 
  gerarRelatorioPDF() {
    const doc = new jsPDF();

    // adiciona logo  PDF
    if (this.logoUrl) {
      doc.addImage(this.logoUrl as string, 'JPEG', 10, 10, 50, 50);
    }

    doc.setFontSize(18);
    doc.text('Orçamento', 10, 70);
    doc.setFontSize(12);

    // emissor
    this.addEmissorInfoToPDF(doc);
    
    // cliente
    this.addClienteInfoToPDF(doc);

    // produtos
    this.addProdutosToPDF(doc);

    // total e observação
    this.addTotalAndObservacaoToPDF(doc);

    // salvar o PDF
    doc.save('orcamento.pdf');
  }

  private addEmissorInfoToPDF(doc: jsPDF) {
    doc.text(`Emissor: ${this.orcamento.emissor.nome || ''}`, 10, 80);
    doc.text(`Telefone: ${this.orcamento.emissor.telefone || ''}`, 10, 90);
    doc.text(`Email: ${this.orcamento.emissor.email || ''}`, 10, 100);
    doc.text(`Endereço: ${this.orcamento.emissor.endereco || ''}`, 10, 110);
    doc.text(`CNPJ: ${this.orcamento.emissor.cnpj || ''}`, 10, 120);
  }

  private addClienteInfoToPDF(doc: jsPDF) {
    doc.text(`Cliente: ${this.orcamento.cliente.nome || ''}`, 10, 140);
    doc.text(`Endereço: ${this.orcamento.cliente.endereco || ''}`, 10, 150);
    doc.text(`Telefone: ${this.orcamento.cliente.telefone || ''}`, 10, 160);
    doc.text(`Email: ${this.orcamento.cliente.email || ''}`, 10, 170);
  }

  private addProdutosToPDF(doc: jsPDF) {
    let yPosition = 190;
    doc.text('Produtos:', 10, yPosition);
    this.orcamento.produtos.forEach((produto, index) => {
      yPosition += 10;
      doc.text(`${index + 1}. ${produto.descricao || ''} - Quantidade: ${produto.quantidade} - Preço: R$${produto.preco.toFixed(2)}`, 10, yPosition);
    });
  }

  private addTotalAndObservacaoToPDF(doc: jsPDF) {
    let yPosition = 210 + this.orcamento.produtos.length * 10;
    doc.setFontSize(14);
    doc.text(`Total: R$${this.orcamento.total.toFixed(2)}`, 10, yPosition);
    yPosition += 20;
    doc.setFontSize(12);
    doc.text('Observação:', 10, yPosition);
    doc.text(this.orcamento.observacao || '', 10, yPosition + 10);
  }

  salvarProduto() {
    if (this.produtoForm.valid) {
      const produto = this.produtoForm.value;
      this.orcamento.produtos.push(produto);
      this.orcamento.total += produto.preco * produto.quantidade;
      this.produtoForm.reset({ quantidade: 1, preco: 0 });
      this.showConfirmation("Produto/Serviço salvo com sucesso!");
    }
  }

  criarOrcamento() {
    this.orcamento.status = 'nao vendido'; 
    this.orcamentos.push({ ...this.orcamento });
    localStorage.setItem('orcamentos', JSON.stringify(this.orcamentos));
    this.atualizarDashboard();
    console.log("Orçamento criado e salvo!");
    this.resetarOrcamento();
  }

  private resetarOrcamento() {
    this.orcamento = {
      emissor: { ...this.emissor },
      cliente: { ...this.cliente },
      observacao: '',
      produtos: [],
      total: 0,
      status: 'nao vendido' 
    };
  }

  salvarEmissor() {
  if (this.emissorForm.valid) {
    this.orcamento.emissor = this.emissorForm.value;
    this.showConfirmation("Emissor salvo com sucesso!");
  } else {
    console.log("Formulário de emissor inválido");
  }
  
}

salvarCliente() {
  if (this.clienteForm.valid) {
    this.orcamento.cliente = this.clienteForm.value;
    this.showConfirmation("Cliente salvo com sucesso!");
  } else {
    console.log("Formulário de cliente inválido");
  }
}

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result;
      };
      reader.onerror = (error) => {
        console.error("Erro ao carregar o logo:", error);
      };
      reader.readAsDataURL(file);
    }
  }

  carregarOrcamentos() {
    const orcamentosSalvos = localStorage.getItem('orcamentos');
    this.orcamentos = orcamentosSalvos ? JSON.parse(orcamentosSalvos) : [];
  }

  atualizarDashboard() {
    this.dashboard.total = this.orcamentos.length;
    this.dashboard.vendidos = this.orcamentos.filter(o => o.status === 'vendido').length;
    this.dashboard.naoVendidos = this.orcamentos.filter(o => o.status === 'nao vendido').length;
  }

  atualizarStatusOrcamento(index: number, status: 'vendido' | 'nao vendido') {
    this.orcamentos[index].status = status;
    localStorage.setItem('orcamentos', JSON.stringify(this.orcamentos));
    this.atualizarDashboard();
  }
}