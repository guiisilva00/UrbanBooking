'use client';

import { useState } from 'react';
import Link from 'next/link';
import propostas from '../../propostas.json';

export default function BotaoExcluir({ id }) {
  const [excluida, setExcluida] = useState(false);

  function Excluir() {
    const listaAtualizada = propostas.filter((item) => item.id !== id);
    console.log('Lista após exclusão (simulação):', listaAtualizada);
    setExcluida(true);
  }

  if (excluida) {
    return (
      <p>
        <strong>Proposta excluída (simulação).</strong>{' '}
        <Link href="/propostas">Voltar para a listagem</Link>
      </p>
    );
  }

  return (
    <div>
      <button type="button" onClick={Excluir}>Excluir Proposta</button>
    </div>
  );
}