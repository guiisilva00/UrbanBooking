'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIAS, ESTADOS } from '../../opcoes';

export default function NovaPropostaPage() {
    const [artista, setArtista] = useState('');
    const [contratante, setContratante] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState(CATEGORIAS[0]);
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('SP');
    const [valor, setValor] = useState('');

    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    async function enviarDados(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (!artista.trim() || !contratante.trim() || !data || !local.trim() || !cidade.trim() || !valor) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!Number.isFinite(Number(valor)) || Number(valor) <= 0) {
            setErro('Informe um valor numérico válido maior que zero.');
            return;
        }

        const novaProposta = {
            artista: artista.trim(),
            contratante: contratante.trim(),
            categoria,
            descricao: descricao.trim(),
            data,
            local: local.trim(),
            cidade: cidade.trim(),
            estado,
            valor: Number(valor),
            status: 'Pendente'
        };

        try {
            const resposta = await fetch('/api/propostas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaProposta)
            });
            const corpo = await resposta.json();
            if (!resposta.ok) {
                setErro(corpo.erro || 'Erro ao cadastrar proposta.');
                return;
            }
        } catch {
            setErro('Não foi possível conectar ao servidor.');
            return;
        }

        setSucesso('Proposta cadastrada com sucesso!');
        setArtista('');
        setContratante('');
        setDescricao('');
        setData('');
        setLocal('');
        setCidade('');
        setValor('');
    }

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Cadastrar Nova Proposta</h1>

            {erro && <div className="alert alert-danger">{erro}</div>}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}

            <form onSubmit={enviarDados} className="row g-3">
                <div className="col-12 col-md-6">
                    <label htmlFor="artista" className="form-label">Artista</label>
                    <input
                        id="artista"
                        type="text"
                        className="form-control"
                        value={artista}
                        onChange={(e) => setArtista(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="contratante" className="form-label">Contratante</label>
                    <input
                        id="contratante"
                        type="text"
                        className="form-control"
                        value={contratante}
                        onChange={(e) => setContratante(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <select
                        id="categoria"
                        className="form-select"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="col-12 col-md-4">
                    <label htmlFor="data" className="form-label">Data do Evento</label>
                    <input
                        id="data"
                        type="date"
                        className="form-control"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <label htmlFor="local" className="form-label">Local (casa de show)</label>
                    <input
                        id="local"
                        type="text"
                        className="form-control"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input
                        id="cidade"
                        type="text"
                        className="form-control"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                        id="estado"
                        className="form-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                </div>

                <div className="col-12 col-md-4">
                    <label htmlFor="valor" className="form-label">Valor (R$)</label>
                    <input
                        id="valor"
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="descricao" className="form-label">Descrição (opcional)</label>
                    <textarea
                        id="descricao"
                        className="form-control"
                        rows={3}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <div className="col-12 d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">Salvar Proposta</button>
                    <Link href="/propostas" className="btn btn-outline-secondary">Voltar para a lista</Link>
                </div>
            </form>
        </div>
    );
}