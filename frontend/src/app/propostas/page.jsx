import Link from 'next/link';
import CardProposta from '../../components/CardProposta';

const SITUACOES = ['Pendente', 'Confirmado', 'Cancelado'];

export default async function PropostasPage({ searchParams }) {
    const { status } = await searchParams;

    // roda no servidor do Next, então chama o backend direto (sem proxy)
    const resposta = await fetch('http://localhost:3005/api/propostas', { cache: 'no-store' });
    if (!resposta.ok) {
        return <div className="container py-4"><div className="alert alert-danger">Não foi possível carregar as propostas. Confira se o backend está rodando.</div></div>;
    }
    const { dados: propostas } = await resposta.json();

    const visiveis = propostas
        .filter((p) => !status || p.status === status)
        .sort((a, b) => a.data.localeCompare(b.data));

    const filtros = [
        { nome: 'Todas', href: '/propostas', total: propostas.length, ativo: !status },
        ...SITUACOES.map((s) => ({
            nome: s,
            href: `/propostas?status=${s}`,
            total: propostas.filter((p) => p.status === s).length,
            ativo: status === s
        }))
    ];

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
                <div>
                    <h1 className="titulo-pagina">Propostas</h1>
                    <p className="texto-secundario mb-0">{propostas.length} propostas, ordenadas pela data do show</p>
                </div>
                <Link href="/nova-proposta" className="btn btn-primary">Cadastrar proposta</Link>
            </div>

            <nav className="d-flex flex-wrap gap-2 mb-4" aria-label="Filtrar por situação">
                {filtros.map((f) => (
                    <Link key={f.nome} href={f.href} className={`etiqueta filtro ${f.ativo ? 'filtro-ativo' : ''}`} aria-current={f.ativo ? 'page' : undefined}>
                        {f.nome} {f.total}
                    </Link>
                ))}
            </nav>

            {visiveis.length === 0 ? (
                <p className="agenda py-4 mb-0">
                    Nenhuma proposta {status ? `com a situação ${status.toLowerCase()}` : 'cadastrada'}.{' '}
                    <Link href="/nova-proposta" className="texto-secundario">Cadastre a primeira</Link>.
                </p>
            ) : (
                <ul className="agenda list-unstyled mb-0">
                    {visiveis.map((proposta) => (
                        <li key={proposta.id}>
                            <CardProposta proposta={proposta} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
