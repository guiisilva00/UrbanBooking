import Link from 'next/link';

function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default async function Home() {
  let propostas = [];
  try {
    const resposta = await fetch('http://localhost:3005/api/propostas', { cache: 'no-store' });
    propostas = (await resposta.json()).dados;
  } catch {
    propostas = [];
  }

  const hoje = new Date().toISOString().slice(0, 10);
  const proximoShow = propostas
    .filter((p) => p.status !== 'Cancelado' && p.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data))[0];

  const situacoes = ['Pendente', 'Confirmado', 'Cancelado'].map((status) => ({
    status,
    total: propostas.filter((p) => p.status === status).length
  }));

  const totalConfirmado = propostas
    .filter((p) => p.status === 'Confirmado')
    .reduce((soma, p) => soma + p.valor, 0);

  return (
    <div className="container py-5">
      <h1 className="fs-4 fw-normal mb-4">
        {saudacao()}. Este é o seu painel de propostas.
      </h1>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <section className="cartaz h-100 p-4 p-md-5" aria-label="Próximo show">
            {proximoShow ? (
              <>
                <p className="cartaz-data mb-1">
                  {new Date(`${proximoShow.data}T00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                </p>
                <h2 className="cartaz-artista">{proximoShow.artista}</h2>
                <p className="mt-3 mb-4">
                  {proximoShow.local}, {proximoShow.cidade}/{proximoShow.estado}. Situação: {proximoShow.status.toLowerCase()}.
                </p>
                <Link href={`/propostas/${proximoShow.id}`} className="btn">Ver detalhes do show</Link>
              </>
            ) : (
              <>
                <h2 className="cartaz-artista mb-3">Agenda livre</h2>
                <p className="mb-4">Nenhum show marcado daqui para frente. Cadastre uma proposta para começar.</p>
                <Link href="/nova-proposta" className="btn">Cadastrar proposta</Link>
              </>
            )}
          </section>
        </div>

        <div className="col-12 col-lg-4">
          <section className="situacao rounded h-100 p-4">
            <h2 className="fs-6 fw-semibold mb-3">Situação das propostas</h2>
            <ul className="list-unstyled mb-4">
              {situacoes.map((s) => (
                <li key={s.status} className="d-flex justify-content-between py-2">
                  <span>{s.status}</span>
                  <strong>{s.total}</strong>
                </li>
              ))}
            </ul>
            <p className="small texto-secundario mb-0">Em cachês confirmados</p>
            <p className="situacao-total mb-0">
              {totalConfirmado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </section>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center gap-3">
        <Link href="/propostas" className="btn btn-primary">Ver todas as propostas</Link>
        <Link href="/nova-proposta" className="texto-secundario">Cadastrar proposta</Link>
      </div>
    </div>
  );
}
