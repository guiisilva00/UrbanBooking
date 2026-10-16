export function criarPropostaController({ propostaService }) {
  async function listar(req, res, next) {
    try {
      const propostas = await propostaService.listar();
      res.status(200).json({ sucesso: true, dados: propostas });
    } catch (erro) {
      next(erro);
    }
  }

  async function buscar(req, res, next) {
    try {
      const proposta = await propostaService.buscarPorId(req.params.id);
      res.status(200).json({ sucesso: true, dados: proposta });
    } catch (erro) {
      if (erro instanceof TypeError) return res.status(400).json({ erro: erro.message });
      if (erro.message.includes('não encontrada')) return res.status(404).json({ erro: erro.message });
      next(erro);
    }
  }

  async function criar(req, res, next) {
    try {
      const propostaNova = await propostaService.criar(req.body);
      res.status(201).json({ sucesso: true, dados: propostaNova });
    } catch (erro) {
      res.status(400).json({ sucesso: false, erro: erro.message });
    }
  }

  async function atualizar(req, res, next) {
    try {
      const propostaAtualizada = await propostaService.atualizar(req.params.id, req.body);
      res.status(200).json({ sucesso: true, dados: propostaAtualizada });
    } catch (erro) {
      if (erro.message.includes('não encontrada')) return res.status(404).json({ erro: erro.message });
      res.status(400).json({ sucesso: false, erro: erro.message });
    }
  }

  async function excluir(req, res, next) {
    try {
      await propostaService.excluir(req.params.id);
      res.status(200).json({ sucesso: true, mensagem: 'Proposta excluída' });
    } catch (erro) {
      if (erro instanceof TypeError) return res.status(400).json({ erro: erro.message });
      if (erro.message.includes('não encontrada')) return res.status(404).json({ erro: erro.message });
      next(erro);
    }
  }

  return { listar, buscar, criar, atualizar, excluir };
}
