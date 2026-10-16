'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NovaPropostaPage() {
    const [cliente, setCliente] = useState('');
    const [categoria, setCategoria] = useState('Esportivo');
    const [data, setData] = useState('');
    const [local, setLocal] = useState('');
    const [valor, setValor] = useState('');

    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    function enviarDados(e) {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (!cliente.trim() || !data || !local.trim() || !valor) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!Number.isFinite(Number(valor)) || Number(valor) <= 0) {
            setErro('Informe um valor numérico válido maior que zero.');
            return;
        }

        const novaProposta = {
            id: Date.now(),
            cliente: cliente.trim(),
            categoria,
            data,
            local: local.trim(),
            valor: Number(valor),
            status: 'Pendente'
        };

        console.log('Nova proposta cadastrada:', novaProposta);

        setSucesso('Proposta cadastrada com sucesso!');
        setCliente('');
        setData('');
        setLocal('');
        setValor('');
    }

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Cadastrar Nova Proposta</h1>

            {erro && <div className="alert alert-danger">{erro}</div>}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}

            <form onSubmit={enviarDados} className="row g-3">
                <div className="col-12 col-md-6">
                    <label htmlFor="cliente" className="form-label">Cliente / Contratante</label>
                    <input
                        id="cliente"
                        type="text"
                        className="form-control"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
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
                        <option value="Esportivo">Esportivo</option>
                        <option value="Casamento">Casamento</option>
                        <option value="Jornalístico">Jornalístico</option>
                        <option value="Social / Aniversário">Social / Aniversário</option>
                        <option value="Corporativo">Corporativo</option>
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
                    <label htmlFor="local" className="form-label">Local</label>
                    <input
                        id="local"
                        type="text"
                        className="form-control"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                    />
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

                <div className="col-12 d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">Salvar Proposta</button>
                    <Link href="/propostas" className="btn btn-outline-secondary">Voltar para a lista</Link>
                </div>
            </form>
        </div>
    );
}