import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoServico } from '../../model/produto-servico.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos: ProdutoServico[] = [];
  private readonly API_URL = 'http://localhost:8081/produtos-servicos';

  constructor(private http: HttpClient) {}

  adicionarProdutoLocal(produto: ProdutoServico): void {
    this.produtos.push(produto);
    console.log('Produto adicionado localmente:', produto);
  }

  getProdutos(): ProdutoServico[] {
    return [...this.produtos];
  }

  adicionarProduto(produto: ProdutoServico): Observable<ProdutoServico> {
    console.log('Produto a ser salvo:', produto);
    return this.http.post<ProdutoServico>('URL_DO_BACKEND', produto);
  }
  
  listarProdutos(): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>('URL_DO_BACKEND');
  }

  limparProdutos(): void {
    this.produtos = [];
    console.log('Produtos limpos localmente.');
  }
}
