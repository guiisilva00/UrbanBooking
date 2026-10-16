import Link from 'next/link';

export default function CardProposta({ proposta }) {
    const data = new Date(`${proposta.data}T00:00`);

    return (
        <Link href={`/propostas/${proposta.id}`} className="linha-proposta row g-2 align-items-center py-3 px-2">
            <div className="col-3 col-md-1 text-center">
                <span className="linha-dia">{String(data.getDate()).padStart(2, '0')}</span>
                <span className="linha-mes">{data.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
            </div>
            <div className="col-9 col-md-4">
                <span className="linha-artista">{proposta.artista}</span>
                <span className="small texto-secundario">{proposta.categoria} para {proposta.contratante}</span>
            </div>
            <div className="col-6 col-md-3 offset-3 offset-md-0 small">
                {proposta.local}<br />{proposta.cidade}/{proposta.estado}
            </div>
            <div className="col-3 col-md-2 fw-semibold text-md-end">
                {Number(proposta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
            </div>
            <div className="col-12 col-md-2 offset-3 offset-md-0 text-md-end">
                <span className={`etiqueta status-${proposta.status.toLowerCase()}`}>{proposta.status}</span>
            </div>
        </Link>
    );
}
