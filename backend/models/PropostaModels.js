export function criarPropostaModel({ pool }) {
  async function listarTodos() {
    const [linhas] = await pool.query('SELECT * FROM propostas');
    return linhas.map((p) => ({ ...p, valor: Number(p.valor) }));
  }

  async function buscarPorId(id) {
    const [linhas] = await pool.query('SELECT * FROM propostas WHERE id = ?', [id]);
    if (linhas.length === 0) return null;
    return { ...linhas[0], valor: Number(linhas[0].valor) };
  }

  async function criar(proposta) {
    const sql = 'INSERT INTO propostas (artista, contratante, categoria, descricao, local, cidade, estado, valor, `data`, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const valores = [proposta.artista, proposta.contratante, proposta.categoria, proposta.descricao, proposta.local, proposta.cidade, proposta.estado, proposta.valor, proposta.data, proposta.status];
    const [resultado] = await pool.query(sql, valores);
    return { ...proposta, id: resultado.insertId };
  }

  return { listarTodos, buscarPorId, criar };
}
