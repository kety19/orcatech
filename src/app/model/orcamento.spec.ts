import { Orcamento } from './orcamento.model';

describe('Orcamento', () => {
  it('should create an instance', () => {
    const orcamento: Orcamento = {
      emissor: { nome: 'Emissor Teste', telefone: '123456789', email: 'emissor@teste.com', endereco: 'Rua Teste', cnpj: '12.345.678/0001-99' },
      cliente: { nome: 'Cliente Teste', endereco: 'Rua Cliente', telefone: '987654321', email: 'cliente@teste.com' },
      observacao: 'Testando Orcamento',
      produtos: [{ nome: 'Produto Teste', descricao: 'Descrição', quantidade: 1, preco: 100 }],
      total: 100,
      status: 'pendente'
    };

    // verificando se o objeto foi criado corretamente
    expect(orcamento).toBeTruthy();
  });
});
