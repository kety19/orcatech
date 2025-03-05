import { Cliente } from "./cliente.model";
import { Emissor } from "./emissor.model";
import { ProdutoServico } from "./produto-servico.model";


export interface Orcamento {
  emissor: Emissor; 
  cliente: Cliente; 
  observacao: string;
  produtos: ProdutoServico[];
  total: number;
  status: string;
}