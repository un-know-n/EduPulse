import './global.css';
import { Providers } from './providers';
import SessionProvider from './components/providers/SessionProvider';
import { Montserrat } from 'next/font/google';
import { CheckUser } from './components/hoc/CheckUser';

const montserrat = Montserrat({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='uk'
      className={montserrat.className}>
      <body>
        <SessionProvider>
          <Providers>
            <CheckUser>{children}</CheckUser>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
