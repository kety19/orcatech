import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento/orcamento.service';
import { EmissorService } from '../../services/emissor/emissor.service';
import { Cliente } from '../../model/cliente.model';
import { ProdutoServico } from '../../model/produto-servico.model';
import { Orcamento } from '../../model/orcamento.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
})
export class OrcamentoComponent implements OnInit {
  orcamentos: Orcamento[] = [];
  clienteForm: FormGroup;
  produtoForm: FormGroup;
  feedbackMessage: string = '';

  constructor(
    private orcamentoService: OrcamentoService,
    private emissorService: EmissorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.produtoForm = this.fb.group({
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.orcamentoService.getOrcamentos().subscribe({
      next: (orcamentos) => {
        console.log('Orçamentos recebidos:', orcamentos);
        this.orcamentos = orcamentos;
      },
      error: (err) => {
        console.error('Erro ao carregar orçamentos:', err);
      },
    });

    this.orcamentoService.feedback$.subscribe((message) => {
      if (message) {
        this.showConfirmation(message);
      }
    });
  }

  criarOrcamento(): void {
    if (this.clienteForm.invalid || this.produtoForm.invalid) {
      this.showConfirmation('Preencha todos os campos corretamente!');
      return;
    }

    const cliente: Cliente = this.clienteForm.value;
    const produtos: ProdutoServico[] = [this.produtoForm.value];
    const emissor = this.emissorService.getEmissor();

    if (!emissor) {
      this.showConfirmation('Emissor não encontrado!');
      return;
    }

    this.orcamentoService.criarOrcamento(emissor, cliente, 'Observação do orçamento', produtos);

    // ✅ **Correção:** Atualiza os orçamentos logo após criar um novo
    this.orcamentoService.getOrcamentos().subscribe((orcamentos) => {
      this.orcamentos = orcamentos;
    });
  }

  showConfirmation(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
