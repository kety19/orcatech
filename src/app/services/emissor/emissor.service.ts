import { Injectable } from '@angular/core';
import { Emissor } from '../../model/emissor.model';

@Injectable({
  providedIn: 'root'
})
export class EmissorService {
  private readonly STORAGE_KEY = 'emissor';
  
setEmissor(emissor: Emissor): void {
  localStorage.setItem('emissor', JSON.stringify(emissor));
  console.log('Emissor salvo:', emissor); 
}

getEmissor(): Emissor | null {
  const emissorData = localStorage.getItem('emissor');
  const emissor = emissorData ? JSON.parse(emissorData) : null;
  console.log('Emissor carregado:', emissor); 
  return emissor;
}
}
