import { Emissor } from './emissor.model';

describe('Emissor', () => {
  it('should accept a valid Emissor object', () => {
    const emissor: Emissor = {
      nome: 'Empresa XYZ',
      telefone: '123456789',
      email: 'contato@empresa.com',
      endereco: 'Rua Exemplo, 123',
      cnpj: '12.345.678/0001-99'
    };
    expect(emissor).toBeTruthy();
  });
});
