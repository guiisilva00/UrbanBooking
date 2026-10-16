import Link from 'next/link';

export default function CardProposta({ proposta }) {
    return (
        <div className='card shadow-sm h-100'>
            <div className='card-body'>
                <h3 className="card-title text-primary fs-5">{proposta.artista}</h3>
                <p className="card-text mb-1"><strong>Contratante:</strong> {proposta.contratante}</p>
                <p className="card-subtitle mb-2 text-muted"><strong>Categoria:</strong> {proposta.categoria}</p>
                <p className="card-text mb-1"><strong>Data:</strong> {proposta.data}</p>
                <p className="card-text mb-1"><strong>Local:</strong> {proposta.local} - {proposta.cidade}/{proposta.estado}</p>
                <p className="card-text mb-1"><strong>Valor:</strong> {Number(proposta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                {proposta.descricao && <p className="card-text mb-1">{proposta.descricao}</p>}
                <p className="card-text mb-3"><strong>Situação:</strong> {proposta.status}</p>
                <Link href={`/propostas/${proposta.id}`} className="btn btn-primary btn-sm">
                    Ver detalhes
                </Link>
            </div>
        </div>
    );
}