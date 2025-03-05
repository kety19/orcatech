import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Emissor } from '../../model/emissor.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { OrcamentoService } from '../../services/orcamento/orcamento.service'; 
import { EmissorService } from '../../services/emissor/emissor.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-emissor',
  templateUrl: './emissor.component.html',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatSnackBarModule,
  ],
  styleUrls: ['./emissor.component.scss'],
  animations: [
    trigger('state', [
      state('done', style({ opacity: 1 })),
      state('start', style({ opacity: 0 })),
      transition('start => done', animate('300ms ease-in')),
    ]),
  ],
  standalone: true,
})
export class EmissorComponent {
  emissorForm: FormGroup;
  emissor: Emissor = { nome: '', telefone: '', email: '', endereco: '', cnpj: '' };
  formSubmetido: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private emissorService: EmissorService,
    private orcamentoService: OrcamentoService
  ) {
    // Inicialização do formulário com validações
    this.emissorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
    });
  }

  salvarEmissor() {
    console.log('Método salvarEmissor foi chamado!');
    this.formSubmetido = true;

    if (this.emissorForm.valid) {
      // Captura os dados do formulário e salva no serviço
      this.emissor = this.emissorForm.value;
      this.emissorService.setEmissor(this.emissor);
      console.log('Emissor salvo:', this.emissor);

      // Exibe mensagem de sucesso
      this.showConfirmation('Emissor salvo com sucesso!');
    } else {
      console.error('Erros no formulário:');
      // Itera pelos erros do formulário para debugging
      Object.keys(this.emissorForm.controls).forEach(key => {
        const controlErrors = this.emissorForm.get(key)?.errors;
        if (controlErrors) {
          console.error(`Erro no campo ${key}:`, controlErrors);
        }
      });

      // Exibe mensagem de erro
      this.showConfirmation('Erro ao salvar emissor. Verifique os dados do formulário.');
    }
  }

  showConfirmation(message: string) {
    console.log('showConfirmation chamada com a mensagem:', message);
    // Configura o MatSnackBar para exibir a mensagem
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // Tempo de exibição em milissegundos
      verticalPosition: 'top', // Posição vertical
      horizontalPosition: 'center', // Posição horizontal
    });
  }
}
