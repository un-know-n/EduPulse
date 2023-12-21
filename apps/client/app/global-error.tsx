'use client';

import { PiSmileyNervousDuotone } from 'react-icons/pi';
import { Montserrat } from 'next/font/google';
import './global.css';

const montserrat = Montserrat({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function GlobalError({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | string;
  reset: () => void;
}) {
  return (
    <html
      lang='uk'
      className={montserrat.className}>
      <body
        style={{
          backgroundColor: 'rgba(26, 32, 44, 1)',
        }}>
        <main
          style={{
            display: 'grid',
            minHeight: '100%',
            placeItems: 'center',
            padding: '6rem 1.5rem',
            color: 'white',
          }}>
          <div
            style={{
              textAlign: 'center',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
              <PiSmileyNervousDuotone style={{ fontSize: '50' }} />
              <h1
                style={{
                  fontSize: '2rem',
                  lineHeight: '2.25rem',
                  fontWeight: '700',
                }}>
                Щось трапилось!
              </h1>
            </div>
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                color: 'color: rgb(75 85 99)',
              }}>
              Вибачте, неочікувана помилка
            </p>
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: '1.5rem',
              }}>
              <button
                onClick={() => reset()}
                className='mainButton'>
                Спробувати знову
              </button>
              <a
                href='#'
                className='SupButton'>
                Служба підтримки <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
