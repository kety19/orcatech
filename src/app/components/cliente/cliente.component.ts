import { Component } from '@angular/core';

import { ClienteService } from '../../services/cliente/cliente.service';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../model/cliente.model';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  cliente: Cliente = {
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
  };

  constructor(private clienteService: ClienteService) {}

  salvarCliente() {
    this.clienteService.setCliente(this.cliente);
  }
}
