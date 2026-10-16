export default class Proposta {
  constructor({ id, artista, contratante, categoria, descricao = '', local, cidade, estado, valor, data, status = 'Pendente' }) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um inteiro positivo.');
    }
    if (typeof artista !== 'string' || artista.trim() === '') {
      throw new TypeError('Artista é obrigatório.');
    }
    if (typeof contratante !== 'string' || contratante.trim() === '') {
      throw new TypeError('Contratante é obrigatório.');
    }
    if (typeof categoria !== 'string' || categoria.trim() === '') {
      throw new TypeError('Categoria é obrigatória.');
    }
    if (typeof descricao !== 'string') {
      throw new TypeError('Descrição deve ser um texto.');
    }
    if (typeof local !== 'string' || local.trim() === '') {
      throw new TypeError('Local é obrigatório.');
    }
    if (typeof cidade !== 'string' || cidade.trim() === '') {
      throw new TypeError('Cidade é obrigatória.');
    }
    if (typeof estado !== 'string' || !/^[A-Z]{2}$/.test(estado)) {
      throw new TypeError('Estado deve ser a sigla da UF (ex: SP).');
    }
    if (!Number.isFinite(valor) || valor < 0) {
      throw new TypeError('Valor deve ser um número maior ou igual a zero.');
    }
    if (typeof data !== 'string' || !data.trim()) {
      throw new TypeError('A data do evento é obrigatória.');
  }
    if (!['Pendente', 'Confirmado', 'Cancelado'].includes(status)) {
      throw new TypeError('Status deve ser Pendente, Confirmado ou Cancelado.');
    }

    this.id = id;
    this.artista = artista.trim();
    this.contratante = contratante.trim();
    this.categoria = categoria.trim();
    this.descricao = descricao.trim();
    this.local = local.trim();
    this.cidade = cidade.trim();
    this.estado = estado;
    this.valor = valor;
    this.data = data;
    this.status = status;
  }
}
