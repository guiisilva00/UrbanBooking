import propostas from '../../../../propostas.json';
import FormEditar from '../../../../components/FormEditar';
import Link from 'next/link';

export default async function EditarPropostaPage({ params }) {
    const { id } = await params;
    const proposta = propostas.find((p) => p.id === Number(id));

    if (!proposta) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">Proposta não encontrada.</div>
                <Link href="/propostas" className="btn btn-secondary">Voltar para a lista</Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Editar Proposta #{proposta.id}</h1>
            <FormEditar propostaInicial={proposta} />
        </div>
    );
}