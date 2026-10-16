import propostas from '../../propostas.json';
import CardProposta from '../../components/CardProposta';

export default function PropostasPage() {
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