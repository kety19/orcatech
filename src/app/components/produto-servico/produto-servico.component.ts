import { Component } from '@angular/core';

import { ProdutoService } from '../../services/produto/produto.service';
import { ProdutoServico } from '../../model/produto-servico.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-servico.component.html',
  styleUrls: ['./produto-servico.component.scss'],
})
export class ProdutoComponent {
  produto: ProdutoServico = {
    nome: 'Pintura',
    descricao: '',
    quantidade: 1,
    preco: 0,
  };

  constructor(private produtoService: ProdutoService) {}

  adicionarProduto() {
    this.produtoService.adicionarProduto(this.produtoService);
    this.produto = { nome: 'Pintura', descricao: '', quantidade: 1, preco: 0 };
 
  }
  produtos: any[] = []; // Array para armazenar produtos

  salvarProduto() {
    if (this.validarProduto()) {
      console.log('Produto salvo com sucesso:', this.produto);
      this.produtos.push({ ...this.produto }); // Adiciona o produto ao array
      this.limparFormulario();
    } else {
      console.error('Por favor, preencha todos os campos corretamente.');
    }
  }

  validarProduto() {
    return this.produto.nome && this.produto.descricao &&
           this.produto.quantidade > 0 && this.produto.preco > 0;
  }

  limparFormulario() {
    this.produto = {
      nome: '',
      descricao: '',
      quantidade: 1,
      preco: 0
    };
  }
}
