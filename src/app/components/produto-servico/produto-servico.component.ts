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
  
}
