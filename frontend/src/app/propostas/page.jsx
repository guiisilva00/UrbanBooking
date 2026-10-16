import CardProposta from '../../components/CardProposta';

export default async function PropostasPage() {
    // roda no servidor do Next, então chama o backend direto (sem proxy)
    const resposta = await fetch('http://localhost:3005/api/propostas', { cache: 'no-store' });
    if (!resposta.ok) {
        return <div className="container py-4"><div className="alert alert-danger">Não foi possível carregar as propostas.</div></div>;
    }
    const { dados: propostas } = await resposta.json();

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Propostas de Eventos</h1>
            
            <div className="row g-3">
                {propostas.map((proposta) => (
                    <div key={proposta.id} className="col-12 col-md-6 col-lg-3">
                        <CardProposta proposta={proposta} />
                    </div>
                ))}
            </div>
        </div>
    );
}