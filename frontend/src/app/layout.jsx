import Link from 'next/link';
import { Bebas_Neue, Work_Sans } from 'next/font/google';
import './globals.css';

const fonteTitulo = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--fonte-titulo' });
const fonteTexto = Work_Sans({ subsets: ['latin'], variable: '--fonte-texto' });

export const metadata = {
  title: 'Urban Booking',
  description: 'Gerenciador operacional de propostas de shows e eventos de Hip Hop',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fonteTitulo.variable} ${fonteTexto.variable}`}>
      <body>
        <header className="topo px-3 px-md-5 py-2">
          <nav>
            <Link href="/propostas">Propostas</Link>
          </nav>
          <Link href="/">
            <img src="/logo.svg" alt="Urban Booking" className="logo" />
          </Link>
          <nav className="text-end">
            <Link href="/nova-proposta">Nova proposta</Link>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer className="container py-4 small">
          Urban Booking, gestão de propostas de shows de Hip Hop.
        </footer>
      </body>
    </html>
  );
}
