import { ProdutoServico } from './produto-servico.model';

describe('ProdutoServico', () => {
  it('should create an instance', () => {
    const produtoServico: ProdutoServico = {
      nome: 'Produto Teste',
      descricao: 'Descrição Teste',
      quantidade: 1,
      preco: 100.0
    };
    expect(produtoServico).toBeTruthy();
  });
});
