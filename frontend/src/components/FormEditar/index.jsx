'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FormEditar({ propostaInicial }) {
    const [cliente, setCliente] = useState(propostaInicial.cliente);
    const [categoria, setCategoria] = useState(propostaInicial.categoria);
    const [valor, setValor] = useState(propostaInicial.valor);
    const [status, setStatus] = useState(propostaInicial.status);
    const [mensagem, setMensagem] = useState('');

    function tratarEnvio(e) {
        e.preventDefault();

        const propostaAtualizada = {
            ...propostaInicial,
            cliente,
            categoria,
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
                <label className="form-label">Cliente</label>
                <input
                    type="text"
                    className="form-control"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />
            </div>

            <div className="col-12 col-md-6">
                <label className="form-label">Categoria</label>
                <input
                    type="text"
                    className="form-control"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
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
                    <option value="Aceita">Aceita</option>
                    <option value="Recusada">Recusada</option>
                </select>
            </div>

            <div className="col-12 d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                <Link href="/propostas" className="btn btn-outline-secondary">Voltar</Link>
            </div>
        </form>
    );
}