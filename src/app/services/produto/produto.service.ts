import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoServico } from '../../model/produto-servico.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private API = 'http://localhost:8081/produtos-servicos';

  constructor(private http: HttpClient) {}

  // Método para adicionar um produto ao back-end
  adicionarProduto(produto: ProdutoServico): Observable<ProdutoServico> {
    return this.http.post<ProdutoServico>(`${this.API}/adicionarProduto`, produto);
  }

  // Método para listar todos os produtos do back-end
  listarProdutos(): Observable<ProdutoServico[]> {
    return this.http.get<ProdutoServico[]>(`${this.API}/listarProdutos`);
  }
}
