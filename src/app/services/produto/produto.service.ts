import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos: ProdutoService[] = [];

  adicionarProduto(produto: ProdutoService) {
    this.produtos.push(produto);
  }

  obterProdutos() {
    return this.produtos;
  }
}
