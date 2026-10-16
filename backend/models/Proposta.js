export default class Proposta {
  constructor({ id, artista, evento, local, valor, data, status = 'Pendente' }) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new TypeError('ID deve ser um inteiro positivo.');
    }
    if (typeof artista !== 'string' || artista.trim() === '') {
      throw new TypeError('Artista é obrigatório.');
    }
    if (typeof evento !== 'string' || evento.trim() === '') {
      throw new TypeError('Evento é obrigatório.');
    }
    if (typeof local !== 'string' || local.trim() === '') {
      throw new TypeError('Local é obrigatório.');
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
    this.evento = evento.trim();
    this.local = local.trim();
    this.valor = valor;
    this.data = data;
    this.status = status;
  }
}
