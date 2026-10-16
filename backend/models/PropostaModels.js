// dados em memória: ao reiniciar a API, a lista volta a ser esta
const propostasIniciais = [
  { id: 1, artista: 'Niink', contratante: 'Festival Cena 2K', categoria: 'Boom Bap', descricao: 'Show principal do estado de São Paulo', local: 'Vale do Anhangabaú', cidade: 'São Paulo', estado: 'SP', valor: 45000, data: '2026-11-21', status: 'Confirmado' },
  { id: 2, artista: 'Matuê', contratante: 'Trap In Sanca', categoria: 'Trap', descricao: '', local: 'Espaço LIV music', cidade: 'São Caetano do Sul', estado: 'SP', valor: 120000, data: '2026-12-05', status: 'Pendente' },
  { id: 3, artista: 'Racionais MCs', contratante: 'Prefeitura de BH', categoria: 'Rap', descricao: 'Virada Cultural', local: 'Praça da Estação', cidade: 'Belo Horizonte', estado: 'MG', valor: 120000, data: '2027-01-17', status: 'Pendente' },
  { id: 4, artista: 'Batalha da Aldeia', contratante: 'SESC Barueri', categoria: 'Batalha de Rima', descricao: '', local: 'SESC Barueri', cidade: 'Barueri', estado: 'SP', valor: 8000, data: '2026-10-30', status: 'Cancelado' },
  { id: 5, artista: 'Brandão', contratante: 'Casa Rap Sul', categoria: 'Trap', descricao: 'Abertura da turnê de verão', local: 'Opinião', cidade: 'Porto Alegre', estado: 'RS', valor: 35000, data: '2026-11-07', status: 'Confirmado' },
  { id: 6, artista: 'Leviano', contratante: 'Festival Rima Norte', categoria: 'Rap', descricao: '', local: 'Centur', cidade: 'Belém', estado: 'PA', valor: 18000, data: '2026-11-14', status: 'Pendente' },
  { id: 7, artista: 'Desiiik', contratante: 'Noite Drill Rio', categoria: 'Drill', descricao: 'Show com participação de convidados', local: 'Circo Voador', cidade: 'Rio de Janeiro', estado: 'RJ', valor: 25000, data: '2026-11-28', status: 'Pendente' },
  { id: 8, artista: 'Senndy', contratante: 'Sesc Pompeia', categoria: 'R&B', descricao: 'Formato acústico', local: 'Sesc Pompeia', cidade: 'São Paulo', estado: 'SP', valor: 22000, data: '2026-12-12', status: 'Confirmado' },
  { id: 9, artista: 'PHL Noturnboy', contratante: 'Baile da Cidade', categoria: 'Funk', descricao: '', local: 'Mineirão', cidade: 'Belo Horizonte', estado: 'MG', valor: 40000, data: '2026-12-19', status: 'Pendente' },
  { id: 10, artista: 'Orochi', contratante: 'Mainstreet Records', categoria: 'Trap', descricao: 'Lançamento de álbum', local: 'Arena Jockey', cidade: 'Rio de Janeiro', estado: 'RJ', valor: 90000, data: '2027-01-09', status: 'Pendente' }
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
