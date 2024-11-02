import { Injectable } from '@angular/core';
import { Emissor } from '../../model/emissor.model';


@Injectable({
  providedIn: 'root'
})
export class EmissorService {
  private emissor: Emissor | null = null;

  setEmissor(dados: Emissor) {
    this.emissor = dados;
  }

  getEmissor(): Emissor | null {
    return this.emissor;
  }
}
