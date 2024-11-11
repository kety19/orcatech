import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento/orcamento.service';
import { Cliente } from '../../model/cliente.model';
import { ProdutoServico } from '../../model/produto-servico.model';
import { Emissor } from '../../model/emissor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Orcamento } from '../../model/orcamento.model';

@Component({
  selector: 'app-orcamento',
  imports: [FormsModule, CommonModule],
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  standalone: true,
})
export class OrcamentoComponent implements OnInit {
  orcamento: Orcamento | null = null;

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.orcamento = this.orcamentoService.getOrcamento(); 
  }

  criarOrcamento(): void {
    const emissor: Emissor = {
      nome: 'Nome do Emissor',
      telefone: '123456789',
      email: 'emissor@empresa.com',
      endereco: 'Endereço do Emissor',
      cnpj: '12.345.678/0001-99',
    };
  
    const cliente: Cliente = {
      nome: 'Nome do Cliente',
      endereco: 'Endereço do Cliente',
      telefone: '987654321',
      email: 'cliente@empresa.com',
    };
  
    const observacao = 'Observação do orçamento';
    const produtos: ProdutoServico[] = [
      { nome: 'Produto 1', descricao: 'Descrição do Produto 1', quantidade: 1, preco: 100 },
      { nome: 'Produto 2', descricao: 'Descrição do Produto 2', quantidade: 2, preco: 150 },
    ];
  
    this.orcamentoService.criarOrcamento(emissor, cliente, observacao, produtos);
    this.orcamento = this.orcamentoService.getOrcamento();
  }
}  