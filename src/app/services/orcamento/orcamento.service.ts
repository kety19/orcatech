import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Orcamento } from '../../model/orcamento.model';
import { ProdutoServico } from '../../model/produto-servico.model';
import { Cliente } from '../../model/cliente.model';
import { Emissor } from '../../model/emissor.model';
import { EmissorService } from '../emissor/emissor.service';

@Injectable({
  providedIn: 'root',
})
export class OrcamentoService {
  private orcamentos: Orcamento[] = [];
  private orcamentosSubject = new BehaviorSubject<Orcamento[]>([]);
  private feedbackSubject = new BehaviorSubject<string>('');

  feedback$ = this.feedbackSubject.asObservable();

  constructor(private emissorService: EmissorService) {
    this.carregarOrcamentos();
  }

  getOrcamentos(): Observable<Orcamento[]> {
    return this.orcamentosSubject.asObservable();
  }

  private atualizarOrcamentos(): void {
    this.orcamentosSubject.next([...this.orcamentos]); // ✅ Garante que a mudança seja detectada
  }

  carregarOrcamentos(): void {
    try {
      const orcamentosSalvos = localStorage.getItem('orcamentos');
      this.orcamentos = orcamentosSalvos ? JSON.parse(orcamentosSalvos) : [];
    } catch (error) {
      console.error('Erro ao carregar orçamentos do localStorage:', error);
      this.orcamentos = [];
    }
    this.atualizarOrcamentos();
  }

  private salvarOrcamentos(): void {
    localStorage.setItem('orcamentos', JSON.stringify(this.orcamentos));
    this.atualizarOrcamentos();
  }

  atualizarStatusOrcamento(index: number, status: 'vendido' | 'nao vendido'): void {
    if (this.orcamentos[index]) {
      this.orcamentos[index].status = status;
      this.salvarOrcamentos();
      this.setFeedbackMessage('Status do orçamento atualizado com sucesso!');
    } else {
      console.error('Orçamento não encontrado');
    }
  }

  criarOrcamento(
    emissor: Emissor,
    cliente: Cliente,
    observacao: string,
    produtos: ProdutoServico[],
    status: string = 'pendente'
  ): void {
    const total = this.calcularTotal(produtos);
    const novoOrcamento: Orcamento = { emissor, cliente, observacao, produtos, total, status };
    
    this.orcamentos.push(novoOrcamento);
    this.salvarOrcamentos();
    this.setFeedbackMessage('Orçamento salvo com sucesso!');
  }

  calcularTotal(produtos: ProdutoServico[]): number {
    return produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  }

  private setFeedbackMessage(message: string): void {
    this.feedbackSubject.next(message);
    setTimeout(() => this.feedbackSubject.next(''), 3000);
  }
}
