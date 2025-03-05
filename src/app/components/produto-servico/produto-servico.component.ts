import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto/produto.service'; 
import { ProdutoServico } from '../../model/produto-servico.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, NgIf],
  templateUrl: './produto-servico.component.html',
  styleUrls: ['./produto-servico.component.scss'],
})
export class ProdutoComponent {
  produtoForm: FormGroup;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
    this.produtoForm = this.fb.group({
      nome: ['Pintura', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.maxLength(200)]],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  adicionarProduto(): void {
    if (this.produtoForm.valid) {
      const produto: ProdutoServico = this.produtoForm.value;
      this.produtoService.adicionarProduto(produto).subscribe({
        next: (response) => {
          console.log('Produto adicionado ao servidor com sucesso:', response);
          this.produtoService.adicionarProdutoLocal(response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Erro ao adicionar produto ao servidor:', error);
        },
      });
    }
  }

  listarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        console.log('Produtos carregados do servidor:', produtos);
      },
      error: (error) => {
        console.error('Erro ao listar produtos:', error);
      },
    });
  }

  private resetForm(): void {
    this.produtoForm.reset({
      nome: 'Pintura',
      descricao: '',
      quantidade: 1,
      preco: 0,
    });
  }
}
