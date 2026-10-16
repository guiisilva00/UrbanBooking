'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIAS } from '../../opcoes';

export default function FormEditar({ propostaInicial }) {
    const [artista, setArtista] = useState(propostaInicial.artista);
    const [contratante, setContratante] = useState(propostaInicial.contratante);
    const [descricao, setDescricao] = useState(propostaInicial.descricao || '');
    const [categoria, setCategoria] = useState(propostaInicial.categoria);
    const [valor, setValor] = useState(propostaInicial.valor);
    const [status, setStatus] = useState(propostaInicial.status);
    const [mensagem, setMensagem] = useState('');

    function tratarEnvio(e) {
        e.preventDefault();

        const propostaAtualizada = {
            ...propostaInicial,
            artista,
            contratante,
            categoria,
            descricao,
            valor: Number(valor),
            status
        };

        console.log('Proposta atualizada (simulação):', propostaAtualizada);
        setMensagem('Proposta atualizada com sucesso!');
    }

    return (
        <form onSubmit={tratarEnvio} className="row g-3">
            {mensagem && <div className="alert alert-success">{mensagem}</div>}

            <div className="col-12 col-md-6">
                <label className="form-label">Artista</label>
                <input
                    type="text"
                    className="form-control"
                    value={artista}
                    onChange={(e) => setArtista(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Contratante</label>
                <input
                    type="text"
                    className="form-control"
                    value={contratante}
                    onChange={(e) => setContratante(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Categoria</label>
                <select
                    className="form-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Valor (R$)</label>
                <input
                    type="number"
                    className="form-control"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Status</label>
                <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>

            <div className="col-12">
                <label className="form-label">Descrição</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </div>

            <div className="col-12 d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                <Link href="/propostas" className="btn btn-outline-secondary">Voltar</Link>
            </div>
        </form>
    );
}