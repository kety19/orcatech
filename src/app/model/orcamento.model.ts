import { ProdutoServico } from "./produto-servico.model";

export interface Orcamento {
  emissor: {
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    cnpj: string;
  };
  cliente: {
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
  };
  observacao: string;
  produtos: ProdutoServico[]; // Array de produtos
  total: number; // Adiciona a propriedade total
}