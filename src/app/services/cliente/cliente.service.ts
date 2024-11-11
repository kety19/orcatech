import { inject, Injectable } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  http = inject(HttpClient);

  API = "http://localhost:8081/clientes/listarClientes"

  constructor(){}

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.API + "/listarClientes")
  }  
}
