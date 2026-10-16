'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BotaoExcluir({ id }) {
  const [excluida, setExcluida] = useState(false);
  const [erro, setErro] = useState('');

  async function Excluir() {
    setErro('');
    try {
      const resposta = await fetch(`/api/propostas/${id}`, { method: 'DELETE' });
      if (!resposta.ok) {
        const corpo = await resposta.json();
        setErro(corpo.erro || 'Erro ao excluir proposta.');
        return;
      }
      setExcluida(true);
    } catch {
      setErro('Não foi possível conectar ao servidor.');
    }
  }

  if (excluida) {
    return (
      <p>
        <strong>Proposta excluída.</strong>{' '}
        <Link href="/propostas">Voltar para a listagem</Link>
      </p>
    );
  }

  return (
    <div>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <button type="button" className="btn btn-outline-danger" onClick={Excluir}>Excluir proposta</button>
    </div>
  );
}
