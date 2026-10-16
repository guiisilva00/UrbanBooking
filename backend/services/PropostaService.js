import Proposta from '../models/Proposta.js';

export function criarPropostaService({ propostaModel }) {
  async function listar() {
    return propostaModel.listarTodos();
  }

  async function buscarPorId(idRecebido) {
    const id = Number(idRecebido);
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um número inteiro positivo');
    }

    const proposta = await propostaModel.buscarPorId(id);
    if (!proposta) throw new Error(`Proposta ${id} não encontrada`);
    return proposta;
  }

  async function criar(dados) {
    const proposta = new Proposta({ id: 1, ...dados });
    return propostaModel.criar({
      artista: proposta.artista,
      contratante: proposta.contratante,
      categoria: proposta.categoria,
      descricao: proposta.descricao,
      local: proposta.local,
      cidade: proposta.cidade,
      estado: proposta.estado,
      valor: proposta.valor,
      data: proposta.data,
      status: proposta.status
    });
  }

  async function atualizar(idRecebido, dados) {
    const atual = await buscarPorId(idRecebido);
    const proposta = new Proposta({ ...atual, descricao: atual.descricao || '', ...dados, id: atual.id });
    const id = atual.id;
    return propostaModel.atualizar(id, {
      artista: proposta.artista,
      contratante: proposta.contratante,
      categoria: proposta.categoria,
      descricao: proposta.descricao,
      local: proposta.local,
      cidade: proposta.cidade,
      estado: proposta.estado,
      valor: proposta.valor,
      data: proposta.data,
      status: proposta.status
    });
  }

  async function excluir(idRecebido) {
    const proposta = await buscarPorId(idRecebido);
    return propostaModel.excluir(proposta.id);
  }

  return { listar, buscarPorId, criar, atualizar, excluir };
}
