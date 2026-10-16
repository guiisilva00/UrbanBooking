import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Urban Booking',
  description: 'Gerenciador operacional de propostas de shows e eventos de Hip Hop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h2>
            <Link href="/">Urban Booking</Link>
          </h2>
          <nav>
            <Link href="/propostas">Propostas</Link> |{' '}
            <Link href="/nova-proposta">Nova Proposta</Link>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <p>Urban Booking - Gestão de propostas de shows e eventos de Hip Hop.</p>
        </footer>
      </body>
    </html>
  );
}
