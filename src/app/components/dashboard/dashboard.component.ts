import { Component, OnInit } from '@angular/core';
import { Orcamento } from '../../model/orcamento.model';
import { OrcamentoService } from '../../services/orcamento/orcamento.service';
import { ProdutoServico } from '../../model/produto-servico.model';
import { Emissor } from '../../model/emissor.model';  // Importando o tipo Emissor
import { Cliente } from '../../model/cliente.model';  // Importando o tipo Cliente
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  orcamentos: Orcamento[] = [];

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.orcamentoService.getOrcamentos().subscribe((orcamentos) => {
      this.orcamentos = orcamentos;
    });
  }

  atualizarStatus(index: number, status: 'vendido' | 'nao vendido'): void {
    this.orcamentoService.atualizarStatusOrcamento(index, status);
  }

  criarNovoOrcamento(): void {
    const emissor: Emissor = {  // Garantindo que é um objeto do tipo Emissor
      nome: 'Emissor A',
      telefone: '123456',
      email: 'teste@email.com',
      endereco: 'Rua X',
      cnpj: '00.000.000/0001-00',
    };

    const cliente: Cliente = {  // Garantindo que é um objeto do tipo Cliente
      nome: 'Cliente A',
      telefone: '987654',
      email: 'cliente@email.com',
      endereco: 'Rua Y',
    };

    const produtos: ProdutoServico[] = [
      {
        nome: 'Produto A',
        descricao: 'Descrição do Produto A',
        quantidade: 2,
        preco: 100,
      },
      {
        nome: 'Produto B',
        descricao: 'Descrição do Produto B',
        quantidade: 1,
        preco: 200,
      },
    ];

    const observacao = 'Entrega em 7 dias úteis';

    // Agora, chamando o método do serviço com os objetos corretos
    this.orcamentoService.criarOrcamento(emissor, cliente, observacao, produtos);
  }
}
