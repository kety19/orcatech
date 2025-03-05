import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./cliente.component.scss'],
  standalone: true
})
export class ClienteComponent {
  clienteForm: FormGroup;

  cliente: Cliente = { nome: '', endereco: '', telefone: '', email: '' };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  salvarCliente() {
    if (this.clienteForm.valid) {
      this.cliente = this.clienteForm.value;
      this.showConfirmation("Cliente salvo com sucesso!");
    } else {
      console.log("Formulário de cliente inválido");
    }
  }

  showConfirmation(message: string) {
    this.snackBar.open(message, 'Fechar', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  }
}
