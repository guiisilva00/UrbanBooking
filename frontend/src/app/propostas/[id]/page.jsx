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
    const data = new Date(`${proposta.data}T00:00`);

    return (
        <div className="container py-5" style={{ maxWidth: '900px' }}>
            <div className="text-center mb-5">
                <div className="d-flex justify-content-center gap-2 mb-3">
                    <span className="etiqueta">{proposta.categoria}</span>
                    <span className={`etiqueta status-${proposta.status.toLowerCase()}`}>{proposta.status}</span>
                </div>
                <h1 className="detalhe-artista">{proposta.artista}</h1>
                <p className="texto-secundario mb-0">Proposta de {proposta.contratante}</p>
            </div>

            <div className="ingresso row g-0 mb-4">
                <div className="col-12 col-md-4 p-4">
                    <p className="small texto-secundario mb-1">Quando</p>
                    <p className="fs-5 fw-semibold mb-0">{data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p className="mb-0">{data.toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
                </div>
                <div className="col-12 col-md-4 p-4">
                    <p className="small texto-secundario mb-1">Onde</p>
                    <p className="fs-5 fw-semibold mb-0">{proposta.local}</p>
                    <p className="mb-0">{proposta.cidade}/{proposta.estado}</p>
                </div>
                <div className="col-12 col-md-4 p-4">
                    <p className="small texto-secundario mb-1">Cachê</p>
                    <p className="fs-5 fw-semibold mb-0">{Number(proposta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </div>

            {proposta.descricao && (
                <p className="text-center fst-italic mx-auto mb-5" style={{ maxWidth: '36rem' }}>“{proposta.descricao}”</p>
            )}

            <div className="d-flex justify-content-center align-items-start flex-wrap gap-2">
                <Link href={`/propostas/${proposta.id}/editar`} className="btn btn-primary">Editar proposta</Link>
                <BotaoExcluir id={proposta.id} />
                <Link href="/propostas" className="btn btn-link texto-secundario">Voltar para a lista</Link>
            </div>
        </div>
    );
}
