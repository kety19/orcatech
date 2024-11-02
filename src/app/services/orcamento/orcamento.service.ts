import { Injectable } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { Emissor } from '../../model/emissor.model';
import { ProdutoServico } from '../../model/produto-servico.model';
import { Orcamento } from '../../model/orcamento.model'; 

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  private orcamento: Orcamento | null = null;

  getOrcamento(): Orcamento | null {
    return this.orcamento;
  }

  setOrcamento(orcamento: Orcamento): void {
    this.orcamento = orcamento;
  }

  calcularTotal(produtos: ProdutoServico[]): number {
    return produtos.reduce((total, produto) => total + produto.preco, 0);
  }

  criarOrcamento(
    emissor: Emissor,
    cliente: Cliente,
    observacao: string,
    produtos: ProdutoServico[]
  ) {
    const total = this.calcularTotal(produtos);
    this.orcamento = { emissor, cliente, observacao, produtos, total };
  }
}
