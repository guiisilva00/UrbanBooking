// dados em memória: ao reiniciar a API, a lista volta a ser esta
const propostasIniciais = [
  { id: 1, artista: 'Djonga', contratante: 'Festival Cena 2K', categoria: 'Boom Bap', descricao: 'Show principal de sábado', local: 'Arena Anhembi', cidade: 'São Paulo', estado: 'SP', valor: 45000, data: '2026-11-21', status: 'Confirmado' },
  { id: 2, artista: 'Matuê', contratante: 'Mainstreet Records', categoria: 'Trap', descricao: '', local: 'Espaço Unimed', cidade: 'São Paulo', estado: 'SP', valor: 80000, data: '2026-12-05', status: 'Pendente' },
  { id: 3, artista: 'Racionais MCs', contratante: 'Prefeitura de BH', categoria: 'Rap', descricao: 'Virada Cultural', local: 'Praça da Estação', cidade: 'Belo Horizonte', estado: 'MG', valor: 120000, data: '2027-01-17', status: 'Pendente' },
  { id: 4, artista: 'Batalha da Aldeia', contratante: 'SESC Barueri', categoria: 'Batalha de Rima', descricao: '', local: 'SESC Barueri', cidade: 'Barueri', estado: 'SP', valor: 8000, data: '2026-10-30', status: 'Cancelado' }
];

export function criarPropostaModel() {
  const propostas = [...propostasIniciais];
  let proximoId = propostas.length + 1;

  async function listarTodos() {
    return propostas;
  }

  async function buscarPorId(id) {
    return propostas.find((p) => p.id === id) || null;
  }

  async function criar(proposta) {
    const nova = { ...proposta, id: proximoId++ };
    propostas.push(nova);
    return nova;
  }

  async function atualizar(id, proposta) {
    const indice = propostas.findIndex((p) => p.id === id);
    propostas[indice] = { ...proposta, id };
    return propostas[indice];
  }

  async function excluir(id) {
    const indice = propostas.findIndex((p) => p.id === id);
    propostas.splice(indice, 1);
  }

  return { listarTodos, buscarPorId, criar, atualizar, excluir };
}
