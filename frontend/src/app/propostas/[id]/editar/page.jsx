import FormEditar from '../../../../components/FormEditar';
import Link from 'next/link';

export default async function EditarPropostaPage({ params }) {
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
            <h1 className="h3 mb-4">Editar Proposta #{proposta.id}</h1>
            <FormEditar propostaInicial={proposta} />
        </div>
    );
}