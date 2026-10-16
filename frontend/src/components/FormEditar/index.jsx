'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIAS, ESTADOS } from '../../opcoes';

export default function FormEditar({ propostaInicial }) {
    const [artista, setArtista] = useState(propostaInicial.artista);
    const [contratante, setContratante] = useState(propostaInicial.contratante);
    const [descricao, setDescricao] = useState(propostaInicial.descricao || '');
    const [categoria, setCategoria] = useState(propostaInicial.categoria);
    const [valor, setValor] = useState(propostaInicial.valor);
    const [status, setStatus] = useState(propostaInicial.status);
    const [local, setLocal] = useState(propostaInicial.local);
    const [cidade, setCidade] = useState(propostaInicial.cidade);
    const [estado, setEstado] = useState(propostaInicial.estado);
    const [data, setData] = useState(propostaInicial.data);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    async function tratarEnvio(e) {
        e.preventDefault();
        setMensagem('');
        setErro('');

        const propostaAtualizada = {
            artista,
            contratante,
            categoria,
            descricao,
            local,
            cidade,
            estado,
            data,
            valor: Number(valor),
            status
        };

        try {
            const resposta = await fetch(`/api/propostas/${propostaInicial.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propostaAtualizada)
            });
            const corpo = await resposta.json();
            if (!resposta.ok) {
                setErro(corpo.erro || 'Erro ao atualizar proposta.');
                return;
            }
        } catch {
            setErro('Não foi possível conectar ao servidor.');
            return;
        }

        setMensagem('Proposta atualizada com sucesso!');
    }

    return (
        <form onSubmit={tratarEnvio} className="ficha row g-3 p-3 p-md-4 mx-0">
            {mensagem && <div className="alert alert-success">{mensagem}</div>}
            {erro && <div className="alert alert-danger">{erro}</div>}

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

            <div className="col-12 col-md-6">
                <label className="form-label">Local (casa de show)</label>
                <input
                    type="text"
                    className="form-control"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Data do Evento</label>
                <input
                    type="date"
                    className="form-control"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Cidade</label>
                <input
                    type="text"
                    className="form-control"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Estado</label>
                <select
                    className="form-select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
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
                <button type="submit" className="btn btn-primary">Salvar alterações</button>
                <Link href={`/propostas/${propostaInicial.id}`} className="btn btn-link texto-secundario">Voltar para a proposta</Link>
            </div>
        </form>
    );
}