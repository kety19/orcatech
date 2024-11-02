import { Component } from '@angular/core';
import { Emissor } from '../../model/emissor.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emissor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './emissor.component.html',
  styleUrls: ['./emissor.component.scss'],
})
export class EmissorComponent {
  emissor: Emissor = {
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cnpj: '',
  };
}
