import Link from 'next/link';
import BotaoExcluir from '../../../components/BotaoExcluir';

export default async function DetalhesPropostaPage({ params }) {
    const { id } = await params;
    const resposta = await fetch(`http://localhost:3005/api/propostas/${id}`, { cache: 'no-store' });

    if (!resposta.ok) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">Proposta não encontrada.</div>
                <Link href="/propostas" className="btn btn-secondary">Voltar para a lista</Link>
            </div>
        );
    }

    const { dados: proposta } = await resposta.json();

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">{proposta.artista}</h1>

            <p><strong>Contratante:</strong> {proposta.contratante}</p>
            <p><strong>Categoria:</strong> {proposta.categoria}</p>
            <p><strong>Data:</strong> {proposta.data}</p>
            <p><strong>Local:</strong> {proposta.local} - {proposta.cidade}/{proposta.estado}</p>
            <p><strong>Valor:</strong> {Number(proposta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <p><strong>Situação:</strong> {proposta.status}</p>
            {proposta.descricao && <p><strong>Descrição:</strong> {proposta.descricao}</p>}

            <div className="d-flex gap-2 mt-4">
                <Link href={`/propostas/${proposta.id}/editar`} className="btn btn-primary">Editar</Link>
                <BotaoExcluir id={proposta.id} />
                <Link href="/propostas" className="btn btn-outline-secondary">Voltar</Link>
            </div>
        </div>
    );
}
