import { Injectable } from '@angular/core';
import { Cliente } from '../../model/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private cliente: Cliente | null = null;

  setCliente(dados: Cliente) {
    this.cliente = dados;
  }

  getCliente(): Cliente | null {
    return this.cliente;
  }
}
